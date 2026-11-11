// Scroll scenes for the home page, ported from the scroll-scenes study.
// startScenes(conveyor, signal) wires every scene; aborting the signal removes all listeners.

const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
const WIDE = "(min-width: 901px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";

export function startScenes(conveyor, signal) {
  const frames = new Set();
  const raf = (fn) => { const id = requestAnimationFrame((t) => { frames.delete(id); fn(t); }); frames.add(id); return id; };
  const cancel = (id) => { cancelAnimationFrame(id); frames.delete(id); };
  const on = (target, type, fn, opts = {}) => target.addEventListener(type, fn, { ...opts, signal });
  const observers = [];
  signal.addEventListener("abort", () => { frames.forEach(cancelAnimationFrame); observers.forEach((o) => o.disconnect()); });

  if (conveyor) heroScene(conveyor, { raf, cancel, on, observers });
  careerSheet({ raf, on });
  workChapter({ raf, on });
  stepScenes({ raf, on });
  jumpNav({ raf, on });
}

// Hero: scroll drives the conveyor; while resting at the top it runs on its own loop.
function heroScene(scene, { raf, cancel, on, observers }) {
  const intro = document.getElementById("top");
  const pin = intro?.querySelector(".intro-pin");
  const caption = document.getElementById("phase-caption");
  const hint = document.getElementById("scene-hint-text");
  const toggle = document.getElementById("auto-toggle");
  const feature = document.querySelector(".work-study__window");
  if (!intro || !pin || !caption || !hint) return;
  const buttons = [...intro.querySelectorAll("[data-step]")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = matchMedia("(min-width: 721px) and (min-height: 640px)");
  // Copy comes from the markup (portfolioData), positions are where each phase sits in the scroll range.
  const phases = buttons.map((button, i) => ({ caption: button.dataset.caption ?? "", at: [0, .34, .57, .97][i] }));
  const hints = [hint.dataset.start ?? "", hint.dataset.end ?? ""];
  const toggleLabels = [toggle?.dataset.stop ?? "", toggle?.dataset.resume ?? ""];
  const from = [244, 242, 235];
  const to = [228, 232, 218];
  const AUTO_RUN = 6500;
  const AUTO_HOLD = 1400;
  const stepOf = (p) => p < .18 ? 0 : p < .44 ? 1 : p < .72 ? 2 : 3;
  let enabled = false;
  let pending = 0;
  let lastProgress = -1;
  let lastStep = -1;
  let featureNear = false;
  let autoRaf = 0;
  let autoStart = 0;
  let autoPaused = false;

  function setStep(step) {
    if (step === lastStep) return;
    intro.dataset.phase = String(step);
    caption.textContent = phases[step].caption;
    hint.textContent = hints[step === 3 ? 1 : 0];
    buttons.forEach((button, i) => {
      if (i === step) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    lastStep = step;
  }
  function autoFrame(now) {
    const t = (now - autoStart) % (AUTO_RUN + AUTO_HOLD);
    const p = Math.min(1, t / AUTO_RUN);
    // Hold: rest briefly, then the finished stack leaves before the next batch appears.
    const leave = smooth((t - AUTO_RUN - AUTO_HOLD * .45) / (AUTO_HOLD * .55));
    setStep(stepOf(p));
    scene.draw(p, 0, smooth(t / 450), leave);
    autoRaf = raf(autoFrame);
  }
  function autoplay(run) {
    if (run && !autoRaf) {
      autoStart = performance.now();
      autoRaf = raf(autoFrame);
    } else if (!run && autoRaf) {
      cancel(autoRaf);
      autoRaf = 0;
      lastProgress = -1;
    }
  }
  function paint() {
    pending = 0;
    if (enabled && featureNear && feature) {
      const open = clamp((innerHeight * .94 - feature.getBoundingClientRect().top) / (innerHeight * .78));
      feature.style.setProperty("--feature-open", String(open));
    }
    const range = Math.max(1, intro.offsetHeight - pin.offsetHeight);
    const p = enabled ? clamp(-intro.getBoundingClientRect().top / range) : 0;
    const auto = enabled && !autoPaused && p === 0 && !document.hidden;
    if (toggle) toggle.hidden = !(enabled && p === 0);
    autoplay(auto);
    if (!auto && Math.abs(p - lastProgress) < .0002) return;
    lastProgress = p;
    const mix = smooth((p - .58) / .42);
    intro.style.setProperty("--scene-bg", from.map((start, i) => Math.round(start + (to[i] - start) * mix)).join(" "));
    if (auto) return;
    setStep(stepOf(p));
    scene.draw(p);
  }
  const schedule = () => { if (!pending) pending = raf(paint); };
  function sync() {
    enabled = desktop.matches && !reduced.matches && document.documentElement.classList.contains("scene-rendered");
    document.documentElement.classList.toggle("motion-ready", enabled);
    lastProgress = -1;
    schedule();
  }
  for (const button of buttons) {
    on(button, "click", () => {
      if (!enabled) return;
      const offset = scrollY + intro.getBoundingClientRect().top;
      const range = intro.offsetHeight - pin.offsetHeight;
      scrollTo({ top: offset + range * phases[Number(button.dataset.step)].at, behavior: "smooth" });
    });
  }
  if (toggle) on(toggle, "click", () => {
    autoPaused = !autoPaused;
    toggle.textContent = toggleLabels[autoPaused ? 1 : 0];
    schedule();
  });
  on(document, "visibilitychange", schedule);
  on(window, "scroll", () => { if (enabled) schedule(); }, { passive: true });
  on(window, "resize", sync, { passive: true });
  on(reduced, "change", sync);
  on(desktop, "change", sync);
  on(document, "conveyorrestored", sync);
  if (feature) {
    const io = new IntersectionObserver(([entry]) => { featureNear = entry.isIntersecting; if (featureNear) schedule(); }, { rootMargin: "100px 0px" });
    io.observe(feature);
    observers.push(io);
  }
  sync();
}

// Career: a panel rises from below and widens to full bleed while the hero settles back.
function careerSheet({ raf, on }) {
  const sheet = document.querySelector(".career-study");
  const intro = document.getElementById("top");
  if (!sheet || !intro) return;
  const query = matchMedia(WIDE);
  let pending = 0;
  let last = -1;
  function paint() {
    pending = 0;
    const p = smooth((innerHeight * .99 - sheet.getBoundingClientRect().top) / (innerHeight * .89));
    if (Math.abs(p - last) < .0005) return;
    last = p;
    sheet.style.setProperty("--career-inset", (27 * (1 - p)).toFixed(3) + "%");
    sheet.style.setProperty("--career-radius", (32 * (1 - p)).toFixed(2) + "px");
    sheet.style.setProperty("--relief-x", ((1 - p) * 125).toFixed(1) + "px");
    intro.style.setProperty("--hero-lift", (-45 * p).toFixed(2) + "px");
    intro.style.setProperty("--hero-scale", (1 - .045 * p).toFixed(4));
    intro.style.setProperty("--copy-lift", (-28 * p).toFixed(2) + "px");
  }
  const schedule = () => { if (query.matches && !pending) pending = raf(paint); };
  function sync() {
    document.documentElement.classList.toggle("scroll-scenes-ready", query.matches);
    last = -1;
    if (query.matches) paint();
  }
  on(window, "scroll", schedule, { passive: true });
  on(window, "resize", sync, { passive: true });
  on(query, "change", sync);
  sync();
}

// Projects chapter: the title fills in as the pinned chapter scrolls by.
function workChapter({ raf, on }) {
  const chapter = document.querySelector("#work .work-chapter");
  const pin = chapter?.querySelector(".work-chapter__pin");
  if (!chapter || !pin) return;
  const query = matchMedia(WIDE);
  let pending = 0;
  function paint() {
    pending = 0;
    const bounds = chapter.getBoundingClientRect();
    const distance = bounds.height - pin.getBoundingClientRect().height;
    if (distance > 0) chapter.style.setProperty("--work-chapter-progress", String(clamp(-bounds.top / distance)));
  }
  const schedule = () => { if (query.matches && !pending) pending = raf(paint); };
  const sync = () => { chapter.toggleAttribute("data-work-motion", query.matches); schedule(); };
  on(window, "scroll", schedule, { passive: true });
  on(window, "resize", schedule, { passive: true });
  on(query, "change", sync);
  sync();
}

// [data-scene] blocks get --p (0..1) and data-step from scroll position.
// Pinned scenes (with a sticky __pin child) measure across their extra height; others across the viewport pass.
function stepScenes({ raf, on }) {
  const scenes = [...document.querySelectorAll("[data-scene]")];
  if (!scenes.length) return;
  const query = matchMedia(WIDE);
  let pending = 0;
  const pinned = (el) => el.dataset.pinned !== undefined;
  function progress(el) {
    const r = el.getBoundingClientRect();
    if (pinned(el)) return clamp(-r.top / Math.max(1, r.height - innerHeight));
    // Unpinned: starts when the top enters at 90% of the viewport, ends as the bottom reaches mid-screen.
    return clamp((innerHeight * .9 - r.top) / Math.max(1, r.height + innerHeight * .4));
  }
  function paint() {
    pending = 0;
    for (const el of scenes) {
      const p = progress(el);
      const n = Number(el.dataset.steps) || 1;
      el.style.setProperty("--p", p.toFixed(4));
      const step = String(Math.min(n - 1, Math.floor(p * n)));
      if (el.dataset.step !== step) el.dataset.step = step;
    }
  }
  const schedule = () => { if (query.matches && !pending) pending = raf(paint); };
  function sync() {
    document.documentElement.classList.toggle("scenes-on", query.matches);
    for (const el of scenes) {
      if (el.querySelector(":scope > [class$='__pin']")) el.dataset.pinned = "";
      if (!query.matches) { delete el.dataset.step; el.style.removeProperty("--p"); }
    }
    if (query.matches) paint();
  }
  // Tabs jump to the scroll position of their step, so clicking and scrolling stay in sync.
  for (const el of scenes) {
    on(el, "click", (event) => {
      const button = event.target.closest("[data-goto]");
      if (!button || !query.matches) return;
      const n = Number(el.dataset.steps) || 1;
      const top = scrollY + el.getBoundingClientRect().top;
      const span = pinned(el) ? el.offsetHeight - innerHeight : el.offsetHeight + innerHeight * .4;
      const offset = pinned(el) ? 0 : -innerHeight * .9;
      scrollTo({ top: top + offset + span * (Number(button.dataset.goto) + .5) / n, behavior: "smooth" });
    });
  }
  on(window, "scroll", schedule, { passive: true });
  on(window, "resize", schedule, { passive: true });
  on(query, "change", sync);
  sync();
}

// Fixed section menu once the hero (which has its own menu) has scrolled away.
function jumpNav({ raf, on }) {
  const nav = document.querySelector(".jump");
  const intro = document.getElementById("top");
  if (!nav || !intro) return;
  const links = [...nav.querySelectorAll(".jump__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  let pending = 0;
  function paint() {
    pending = 0;
    nav.hidden = intro.getBoundingClientRect().bottom > innerHeight * .5;
    let current = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) current = i; });
    links.forEach((a, i) => i === current ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
  }
  const schedule = () => { if (!pending) pending = raf(paint); };
  on(window, "scroll", schedule, { passive: true });
  on(window, "resize", schedule, { passive: true });
  paint();
}
