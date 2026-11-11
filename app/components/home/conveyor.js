// Isometric conveyor for the home hero, ported from the scroll-scenes study.
// mountConveyor(canvas) returns { draw(p, cam, appear, leave), dispose() } or null without WebGL.
import * as T from "three";

export function mountConveyor(stage) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 721px) and (min-height: 640px)");
  const scene = new T.Scene();
  const rig = new T.Group();
  scene.add(rig);

  let renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas: stage, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.55));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;

  // Large studio sources give the enamel and hardware real reflections.
  const environment = new T.Scene();
  environment.background = new T.Color(0x6a756d);
  function softbox(w, h, x, y, z, intensity, color) {
    const source = new T.Mesh(
      new T.PlaneGeometry(w, h),
      new T.MeshBasicMaterial({ color: new T.Color(color).multiplyScalar(intensity), side: T.DoubleSide })
    );
    source.position.set(x, y, z);
    source.lookAt(0, 0, 0);
    environment.add(source);
  }
  softbox(11, 8, -3, 8, 3, 4, 0xfff5e3);
  softbox(12, 4, 2, 4, -9, 2.7, 0xddeee5);
  softbox(6, 3.5, 9, 3, 2, 1.8, 0xfff4e5);
  const pmrem = new T.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(environment, .06).texture;
  pmrem.dispose();
  environment.traverse((e) => { if (e.isMesh) { e.geometry.dispose(); e.material.dispose(); } });

  scene.add(new T.HemisphereLight(0xfff7ea, 0x6b7c6e, 1.65));
  const light = new T.DirectionalLight(0xffe9cd, 2.7);
  light.position.set(-5, 9, 6);
  light.castShadow = true;
  light.shadow.mapSize.set(1536, 1536);
  light.shadow.camera.left = -10;
  light.shadow.camera.right = 10;
  light.shadow.camera.top = 7;
  light.shadow.camera.bottom = -7;
  light.shadow.camera.near = .5;
  light.shadow.camera.far = 26;
  light.shadow.normalBias = .025;
  light.shadow.bias = -.00017;
  scene.add(light);
  const fill = new T.DirectionalLight(0xd4eee9, 1.35);
  fill.position.set(6, 5, -8);
  scene.add(fill);

  const mat = (color, roughness = .45, metalness = .12, extra = {}) =>
    new T.MeshPhysicalMaterial({ color, roughness, metalness, ...extra });
  const palette = {
    chassis: mat(0x194a3b, .39, .2, { clearcoat: .4, clearcoatRoughness: .27 }),
    dark: mat(0x15261f, .58, .13),
    cream: mat(0xcfcbbc, .34, .22, { clearcoat: .31, clearcoatRoughness: .24 }),
    enamel: mat(0xe7ddc8, .3, .14, { clearcoat: .43, clearcoatRoughness: .22 }),
    aluminum: mat(0x99a39c, .26, .77),
    screw: mat(0xc4c8bc, .29, .84),
    rubber: mat(0x282d26, .83, .015),
    roller: mat(0x474f45, .53, .52),
    amber: mat(0xca7434, .36, .19, { clearcoat: .45, clearcoatRoughness: .22 }),
    rust: mat(0x9f4224, .44, .12),
    mint: mat(0x79a584, .4, .2, { clearcoat: .38 }),
    slate: mat(0x486e60, .38, .21),
    screen: mat(0x101f1a, .22, .15, { clearcoat: .85, clearcoatRoughness: .12 }),
    glass: mat(0x9bd3b5, .15, .11, { transparent: true, opacity: .32, depthWrite: false, clearcoat: 1 }),
    charcoal: mat(0x31382f, .55, .14),
    line: mat(0xc0c4ad, .49, .18),
  };

  const geometries = new Map();
  function geom(key, factory) {
    if (!geometries.has(key)) geometries.set(key, factory());
    return geometries.get(key);
  }
  function mesh(parent, geometry, material, x, y, z, cast = true) {
    const m = new T.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function box(parent, w, h, d, x, y, z, material, bevel = 0, cast = true) {
    const key = [w, h, d, bevel].join(":");
    const shape = geom(key, () => {
      if (!bevel) return new T.BoxGeometry(w, h, d);
      const b = Math.min(bevel, w * .24, h * .24, d * .24);
      const a = w / 2 - b;
      const c = h / 2 - b;
      const outline = new T.Shape();
      outline.moveTo(-a, -c);
      outline.lineTo(a, -c);
      outline.lineTo(a, c);
      outline.lineTo(-a, c);
      outline.closePath();
      const form = new T.ExtrudeGeometry(outline, {
        depth: d - 2 * b, bevelEnabled: true, bevelSize: b, bevelThickness: b,
        bevelSegments: 3, steps: 1, curveSegments: 1
      });
      form.translate(0, 0, -(d - 2 * b) / 2);
      return form;
    });
    return mesh(parent, shape, material, x, y, z, cast);
  }
  function cylinder(parent, r, h, x, y, z, material, axis = "y", facets = 22) {
    const solid = geom(["c", r, h, facets].join(":"), () => new T.CylinderGeometry(r, r, h, facets));
    const m = mesh(parent, solid, material, x, y, z);
    if (axis === "z") m.rotation.x = Math.PI / 2;
    if (axis === "x") m.rotation.z = Math.PI / 2;
    return m;
  }
  function group(parent, x = 0, y = 0, z = 0) {
    const node = new T.Group();
    node.position.set(x, y, z);
    parent.add(node);
    return node;
  }

  function lettering(text, w, h, ink, size = 39, options = {}) {
    const plate = document.createElement("canvas");
    plate.width = 512;
    plate.height = Math.max(64, Math.round(512 * h / w));
    const ctx = plate.getContext("2d");
    ctx.clearRect(0, 0, plate.width, plate.height);
    if (options.bg) {
      ctx.fillStyle = options.bg;
      ctx.fillRect(0, 0, plate.width, plate.height);
    }
    ctx.fillStyle = ink;
    ctx.font = (options.weight || 650) + " " + size + "px 'Cascadia Mono',Consolas,monospace";
    ctx.textAlign = options.left ? "left" : "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, options.left ? 20 : 256, plate.height * .52);
    const texture = new T.CanvasTexture(plate);
    texture.colorSpace = T.SRGBColorSpace;
    texture.anisotropy = Math.min(6, renderer.capabilities.getMaxAnisotropy());
    return new T.Mesh(
      new T.PlaneGeometry(w, h),
      new T.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false })
    );
  }
  function sign(parent, text, w, h, x, y, z, color, size, options = {}) {
    const label = lettering(text, w, h, color, size, options);
    label.position.set(x, y, z);
    if (options.top) label.rotation.x = -Math.PI / 2;
    parent.add(label);
    return label;
  }
  function screw(x, y, z, parent = rig, face = "y") {
    const pin = cylinder(parent, .045, .025, x, y, z, palette.screw, face, 10);
    const cut = box(pin, .056, .003, .014, 0, .013, 0, palette.dark, 0, false);
    cut.rotation.y = .45;
  }

  const floor = new T.Mesh(new T.PlaneGeometry(43, 31), new T.ShadowMaterial({ opacity: .24 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -.59;
  floor.receiveShadow = true;
  scene.add(floor);
  const blur = document.createElement("canvas");
  blur.width = blur.height = 128;
  const blurCtx = blur.getContext("2d");
  const gaussian = blurCtx.createRadialGradient(64, 64, 2, 64, 64, 64);
  gaussian.addColorStop(0, "rgba(31,39,32,.35)");
  gaussian.addColorStop(.46, "rgba(31,39,32,.17)");
  gaussian.addColorStop(1, "rgba(31,39,32,0)");
  blurCtx.fillStyle = gaussian;
  blurCtx.fillRect(0, 0, 128, 128);
  const blurMap = new T.CanvasTexture(blur);
  blurMap.colorSpace = T.SRGBColorSpace;
  for (const x of [-5.2, -.2, 5.4]) {
    const contact = new T.Mesh(new T.PlaneGeometry(6.7, 4.7),
      new T.MeshBasicMaterial({ map: blurMap, transparent: true, depthWrite: false }));
    contact.position.set(x, -.586, 0);
    contact.rotation.x = -Math.PI / 2;
    scene.add(contact);
  }

  // Split castings and a common rail keep the modules one physical machine.
  for (const [x, width] of [[-6.15, 2.96], [-.05, 9.48], [6.03, 2.92]]) {
    for (const z of [-1.14, 1.14]) {
      box(rig, width - .33, .19, .49, x, -.44, z, palette.dark, .065);
    }
    box(rig, width, .37, 3.63, x, -.19, 0, palette.chassis, .105);
    box(rig, width - .04, .27, 3.59, x, .109, 0, palette.cream, .085);
    box(rig, width - .09, .20, 3.5, x, .325, 0, palette.enamel, .07);
    box(rig, width - .22, .13, .053, x, -.159, 1.818, palette.slate, .014);
    for (const offset of [-width / 2 + .28, width / 2 - .28]) {
      screw(x + offset, .43, 1.54);
      screw(x + offset, .43, -1.54);
    }
  }
  box(rig, 9.51, .18, 2.29, -.05, .428, 0, palette.rubber, .039);
  const rollers = [];
  for (let i = 0; i < 33; i++) {
    const x = -4.67 + .289 * i;
    const roller = cylinder(rig, .094, 2.17, x, .532, 0, i % 4 === 0 ? palette.roller : palette.charcoal, "z", 14);
    rollers.push(roller);
  }
  for (const z of [-1.27, 1.27]) {
    box(rig, 9.48, .18, .24, -.05, .569, z, palette.aluminum, .036);
    box(rig, 9.35, .071, .095, -.05, .683, z, palette.dark, .017, false);
    for (const x of [-4.57, -3.2, -1.36, .56, 2.22, 4.36]) screw(x, .71, z);
  }
  for (const x of [-6.15, 6.03]) {
    box(rig, 2.56, .13, 2.45, x, .459, 0, x < 0 ? palette.amber : palette.slate, .043);
    for (const z of [-.84, -.56, -.28, 0, .28, .56, .84]) {
      box(rig, 2.18, .033, .061, x, .535, z, x < 0 ? palette.rust : palette.chassis, .009, false);
    }
    for (const z of [-1.33, 1.33]) {
      box(rig, 2.53, .19, .17, x, .574, z, palette.aluminum, .035);
    }
  }
  sign(rig, "T H I S N O R M   /   SYSTEMS", 2.58, .21, -1.95, -.15, 1.849, "#dee7d7", 21);
  sign(rig, "INPUT", 1.12, .20, -6.20, -.15, 1.852, "#f7e3c8", 53);
  sign(rig, "OUTPUT", 1.22, .20, 6.06, -.15, 1.851, "#e5ecdb", 47);

  const sort = group(rig, -3.68);
  const sorter = group(sort, 0, 1.59, 0);
  for (const z of [-1.41, 1.41]) {
    box(sort, .97, .23, .57, 0, .55, z, palette.dark, .054);
    box(sort, .68, 1.45, .39, 0, 1.24, z, palette.chassis, .074);
    box(sort, .45, 1.09, .105, 0, 1.22, z + (z > 0 ? .215 : -.215), palette.mint, .023);
    screw(0, 1.67, z + (z > 0 ? .27 : -.27), sort, "z");
  }
  box(sort, .97, .25, 3.31, 0, 2.013, 0, palette.chassis, .074);
  box(sort, .84, .098, 3.18, 0, 2.166, 0, palette.enamel, .034);
  box(sort, .13, .108, 2.90, -.275, 2.196, 0, palette.amber, .022);
  box(sorter, .49, .25, 2.25, .14, 0, 0, palette.aluminum, .036);
  for (const z of [-.96, -.72, -.48, -.24, 0, .24, .48, .72, .96]) {
    box(sorter, .25, .192, .096, .14, -.177, z, palette.dark, .021);
  }
  sign(sort, "01  /  SORT", .89, .15, 0, 2.026, 1.659, "#d9e7d8", 44);

  const compute = group(rig, -.39);
  for (const z of [-1.47, 1.47]) {
    box(compute, 1.89, .27, .60, 0, .58, z, palette.dark, .056);
    box(compute, 1.41, 1.75, .59, 0, 1.43, z, palette.amber, .12);
    box(compute, 1.12, .66, .047, 0, 1.407, z + (z > 0 ? .30 : -.30), palette.rust, .029);
    for (const x of [-.40, -.24, -.08, .08, .24, .40]) {
      box(compute, .047, .43, .061, x, 1.41, z + (z > 0 ? .33 : -.33), palette.dark, .009, false);
    }
  }
  box(compute, 1.98, .53, 3.71, 0, 2.34, 0, palette.amber, .128);
  box(compute, 1.72, .19, 3.41, 0, 2.669, 0, palette.enamel, .065);
  box(compute, 1.24, .10, 2.54, .02, 2.797, -.12, palette.dark, .031);
  box(compute, .92, .051, 2.31, .07, 2.866, -.12, palette.aluminum, .016);
  for (let i = 0; i < 12; i++) {
    box(compute, .71, .044, .061, .09, 2.912, -1.16 + .189 * i, palette.charcoal, .01, false);
  }
  const press = group(compute, 0, 1.75, 0);
  box(press, 1.24, .25, 2.18, 0, 0, 0, palette.aluminum, .045);
  for (const z of [-.82, .82]) cylinder(press, .095, .46, 0, .20, z, palette.screw);
  box(compute, 1.42, .223, .059, 0, 2.356, 1.86, palette.screen, .018);
  sign(compute, "02  /  PROCESS", 1.29, .16, -.02, 2.35, 1.895, "#efe5cb", 39);
  for (const x of [-.63, .63]) screw(x, 2.10, 1.837, compute, "z");

  const scan = group(rig, 2.97);
  for (const z of [-1.44, 1.44]) {
    box(scan, .90, .23, .53, 0, .577, z, palette.dark, .063);
    box(scan, .65, 1.56, .39, 0, 1.305, z, palette.slate, .073);
    box(scan, .49, 1.23, .089, 0, 1.36, z + (z > 0 ? .208 : -.208), palette.mint, .029);
  }
  box(scan, .97, .263, 3.43, 0, 2.144, 0, palette.slate, .074);
  box(scan, .83, .09, 3.19, 0, 2.325, 0, palette.enamel, .033);
  box(scan, .62, .093, 2.62, 0, 2.377, 0, palette.mint, .03);
  box(scan, .069, 1.21, 2.21, .29, 1.397, -.055, palette.glass, .02, false);
  sign(scan, "03  /  VERIFY", .92, .14, 0, 2.145, 1.723, "#e5eee3", 41);
  const scanMaterial = new T.MeshBasicMaterial({
    color: 0xb3f1c4, transparent: true, opacity: 0, depthWrite: false, toneMapped: false
  });
  const scanMark = box(scan, .046, .02, 2.10, -.14, .654, 0, scanMaterial, 0, false);

  function indicator(parent, x, y, z) {
    const m = mat(0x6b715c, .29, .13, { emissive: 0x8abe9d, emissiveIntensity: 0 });
    cylinder(parent, .067, .024, x, y, z, palette.dark);
    cylinder(parent, .041, .022, x, y + .017, z, m);
    return m;
  }
  const signals = [
    indicator(sort, -.26, 2.222, 1.23),
    indicator(compute, .65, 2.776, 1.40),
    indicator(scan, .14, 2.438, 1.18),
  ];

  // Three different inputs converge into a single record and travel together.
  const records = [];
  const rawColors = [0xd6aa62, 0xc05a36, 0xece5d3];
  const finalColors = [0x4a805e, 0x6c9c76, 0xbed1a8];
  for (let index = 0; index < 3; index++) {
    const item = group(rig);
    const surface = mat(rawColors[index], .44, .10, { clearcoat: .24 });
    box(item, 1.22, .122, .87, 0, 0, 0, surface, .034);
    box(item, 1.09, .023, .748, 0, .068, 0, index === 2 ? palette.enamel : surface, .008, false);
    for (let row = 0; row < 3; row++) {
      box(item, .45 - row * .06, .006, .030, .19 - row * .032, .083, -.20 + .155 * row,
        index === 1 ? palette.cream : palette.charcoal, 0, false);
    }
    if (index === 0) {
      for (let column = 0; column < 3; column++) for (let row = 0; row < 2; row++) {
        box(item, .063, .009, .062, -.4 + column * .104, .085, -.10 + row * .123, palette.rust, .003, false);
      }
    } else if (index === 1) {
      cylinder(item, .137, .024, -.298, .087, -.034, palette.dark, "y", 30);
      cylinder(item, .068, .030, -.298, .094, -.034, palette.cream, "y", 24);
    } else {
      box(item, .237, .014, .244, -.305, .081, -.029, palette.amber, .006, false);
    }
    records.push({ item, surface, raw: new T.Color(rawColors[index]), checked: new T.Color(finalColors[index]) });
  }
  const check = group(records[2].item, -.3, .099, -.026);
  cylinder(check, .154, .024, 0, 0, 0, palette.chassis);
  const checkShort = box(check, .104, .012, .028, -.041, .018, .027, palette.enamel, .003, false);
  const checkLong = box(check, .169, .012, .028, .045, .018, -.006, palette.enamel, .003, false);
  checkShort.rotation.y = -.72;
  checkLong.rotation.y = .85;

  const camera = new T.OrthographicCamera(-8, 8, 5, -5, .1, 100);
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
  const ease = (a, b, p) => { const q = clamp((p - a) / (b - a)); return q * q * (3 - 2 * q); };
  const lerp = (a, b, k) => a + (b - a) * k;
  const between = (a, b, c, p) => ease(a, b, p) * (1 - ease(b, c, p));
  const track = [[0,-6.46],[.17,-5.94],[.34,-3.69],[.45,-2.64],[.57,-.42],[.67,.52],[.81,2.98],[1,6.03]];
  function travel(p) {
    for (let i = 1; i < track.length; i++) {
      const [b, to] = track[i];
      const [a, from] = track[i - 1];
      if (p <= b) return lerp(from, to, ease(a, b, p));
    }
    return track.at(-1)[1];
  }
  let width = 1;
  let height = 1;
  let progress = 0;
  // cam: camera progress; autoplay passes 0 so only the belt runs and the view holds still.
  // appear/leave (0..1) are autoplay-only: the finished stack slides off the output end
  // and the next batch grows in, so the loop never cuts. Scroll mode keeps the defaults.
  function draw(p, cam = p, appear = 1, leave = 0) {
    progress = clamp(p);
    const q = progress;
    const set = ease(.01, .34, q);
    const ok = ease(.76, .92, q);
    const x = travel(q);
    const xStart = [-.25, .42, -.23];
    const zStart = [-.66, .71, .15];
    const yStart = [.73, .91, 1.40];
    const zTilt = [-.11,.21,-.27];
    records.forEach(({ item, surface, raw, checked }, i) => {
      const spacing = i === 2 ? .012 : (i - 1) * .035;
      item.position.set(x + lerp(xStart[i], spacing, set),
        lerp(yStart[i], .728 + i * .122, set) - ok * .095,
        lerp(zStart[i], (i - 1) * .027, set));
      item.rotation.set(lerp((i - 1) * .11, 0, set), lerp(zTilt[i], .018 * (i - 1), set),
        lerp(-zTilt[i] * .6, 0, set));
      surface.color.copy(raw).lerp(checked, ok);
      item.position.x += leave * leave * 1.8;
      item.scale.setScalar(Math.max(.001, appear * (1 - leave)));
    });
    check.visible = ok > .09;
    check.scale.setScalar(Math.max(.01, ease(.78, .88, q)));
    sorter.position.y = 1.59 - .46 * between(.16,.34,.43,q);
    press.position.y = 1.75 - .60 * between(.46,.576,.676,q);
    scanMaterial.opacity = .86 * between(.67,.79,.91,q);
    scanMark.position.x = lerp(-.32,.45,ease(.67,.92,q));
    rollers.forEach((r, i) => { r.rotation.y = (x + 6.46) * 1.5 + i * .09; });
    const indicatorLevels = [between(.14,.33,.49,q), between(.40,.57,.72,q), ease(.67,.81,q)];
    signals.forEach((s, i) => {
      s.emissiveIntensity = indicatorLevels[i] * 1.55;
      s.color.set(0x6b715c).lerp(new T.Color(0xbce1a8), indicatorLevels[i]);
    });
    const movingCamera = desktop.matches && !reduced.matches ? clamp(cam) : 0;
    const zoom = ease(.22,.82,movingCamera);
    const cx = lerp(-7.4, -5.1, zoom);
    camera.position.set(cx, lerp(9.3,8.25,zoom), 13.3);
    camera.lookAt(lerp(.13,.24,zoom), .77, 0);
    const aspect = width / height;
    const spanX = Math.max(15.9, aspect * 7.45) * (1 + zoom * .05);
    camera.left = -spanX / 2;
    camera.right = spanX / 2;
    camera.top = spanX / aspect / 2;
    camera.bottom = -spanX / aspect / 2;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }
  function resize() {
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    draw(progress);
  }
  const root = document.documentElement;
  const onLost = (event) => { event.preventDefault(); root.classList.remove("scene-rendered", "motion-ready"); };
  const onRestored = () => { resize(); root.classList.add("scene-rendered"); document.dispatchEvent(new Event("conveyorrestored")); };
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();
  root.classList.add("scene-rendered");
  stage.addEventListener("webglcontextlost", onLost);
  stage.addEventListener("webglcontextrestored", onRestored);
  return {
    draw,
    dispose() {
      observer.disconnect();
      stage.removeEventListener("webglcontextlost", onLost);
      stage.removeEventListener("webglcontextrestored", onRestored);
      root.classList.remove("scene-rendered");
      renderer.dispose();
    },
  };
}
