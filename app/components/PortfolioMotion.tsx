"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { homeCopy } from "./portfolioData";

const HERO_DURATION = 4200;
const HERO_TRANSIT = 2800;
const SHARED_PATH =
  "C470 691 534 675 581 651Q603 641 601 615V591Q601 574 628 558L871 403Q896 389 919 400L1000 429Q1021 436 1047 420L1372 281";
const HERO_ROUTES = [
  `M204 660C290 672 337 710 410 700${SHARED_PATH}`,
  `M328 832C352 791 364 733 410 700${SHARED_PATH}`,
  `M168 785C257 810 330 748 410 700${SHARED_PATH}`,
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function HeroScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const traceRef = useRef<SVGPathElement>(null);
  const gateRef = useRef<SVGPathElement>(null);
  const outputRef = useRef<SVGPathElement>(null);
  const routeRefs = useRef<(SVGPathElement | null)[]>([]);
  const packetRefs = useRef<(SVGGElement | null)[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const replay = replayRef.current;
    const trace = traceRef.current;
    const gate = gateRef.current;
    const output = outputRef.current;
    if (!scene || !replay || !trace || !gate || !output) return;

    const packets = HERO_ROUTES.flatMap((_, index) => {
      const route = routeRefs.current[index];
      const node = packetRefs.current[index];
      return route && node
        ? [{ route, node, delay: index * 600, length: route.getTotalLength() }]
        : [];
    });
    if (packets.length !== HERO_ROUTES.length) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let playing = false;
    let visible = false;
    let seen = false;
    let raf = 0;

    const render = (time: number) => {
      for (const packet of packets) {
        const progress = (time - packet.delay) / HERO_TRANSIT;
        const t = clamp(progress);
        const point = packet.route.getPointAtLength(t * packet.length);
        const fade = clamp(t / 0.07) * clamp((1 - t) / 0.12);
        packet.node.style.transform =
          `translate(${point.x}px, ${point.y}px) scale(${1.15 - t * 0.35})`;
        packet.node.style.opacity =
          progress >= 0 && progress <= 1 ? String(fade * 0.88) : "0";
      }
      const head = clamp(time / HERO_TRANSIT);
      trace.style.strokeDasharray = `75 ${packets[0].length}`;
      trace.style.strokeDashoffset = String(-head * packets[0].length + 75);
      trace.style.opacity = time > 100 && time < HERO_TRANSIT ? "0.4" : "0";
      gate.style.opacity = packets.some((packet) => {
        const progress = (time - packet.delay) / HERO_TRANSIT;
        return progress > 0.52 && progress < 0.68;
      }) ? "0.46" : "0";
      const arrival = Math.max(0, ...packets.map((packet) => {
        const elapsed = time - packet.delay - HERO_TRANSIT;
        return elapsed >= -150 && elapsed < 380
          ? Math.sin(clamp((elapsed + 150) / 530) * Math.PI)
          : 0;
      }));
      output.style.opacity = String(arrival * 0.65);
    };

    const finish = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      const wasPlaying = playing;
      playing = false;
      render(HERO_DURATION);
      if (wasPlaying && !disposed) setIsPlaying(false);
    };
    const play = () => {
      finish();
      if (disposed || preference.matches || document.hidden || !visible) return;
      seen = true;
      playing = true;
      setIsPlaying(true);
      const startTime = performance.now();
      render(0);
      const tick = (now: number) => {
        if (disposed || !playing) return;
        const time = now - startTime;
        if (time >= HERO_DURATION || preference.matches || document.hidden || !visible) {
          finish();
          return;
        }
        render(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const firstPlay = () => {
      if (disposed || seen || !visible || document.hidden) return;
      seen = true;
      play();
    };
    const onReplay = () => playing ? finish() : play();
    const onPreferenceChange = () => finish();
    const onVisibilityChange = () => {
      if (disposed) return;
      if (document.hidden) finish();
      else firstPlay();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (disposed || !entry) return;
      visible = entry.isIntersecting && entry.intersectionRatio > 0;
      if (visible) firstPlay();
      else finish();
    }, { threshold: [0, 0.2] });

    render(HERO_DURATION);
    observer.observe(scene.closest(".hero") ?? scene);
    replay.addEventListener("click", onReplay);
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      observer.disconnect();
      replay.removeEventListener("click", onReplay);
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      finish();
    };
  }, []);

  return (
    <>
      <figure
        ref={sceneRef}
        className="hero-scene"
        aria-label="흩어진 수작업이 하나의 흐름이 되는 개념 그래픽"
      >
        <Image
          src="/portfolio/hero-everyday.png"
          alt=""
          width={1604}
          height={980}
          priority
          sizes="(max-width: 370px) 465px, (max-width: 600px) 490px, (max-width: 1000px) 850px, 1030px"
        />
        <svg className="hero-flow" viewBox="0 0 1604 980" aria-hidden="true" focusable="false">
          <path
            ref={traceRef}
            className="flow-trace"
            d={HERO_ROUTES[0]}
            fill="none"
            stroke="#e0e4e9"
            strokeWidth="2.1"
            strokeLinecap="round"
            opacity="0"
          />
          <path
            ref={gateRef}
            className="flow-gate"
            d="M789 296Q802 293 819 300L884 327Q906 337 907 359V485"
            fill="none"
            stroke="#e3e8ed"
            strokeWidth="2"
            opacity="0"
          />
          <path
            ref={outputRef}
            className="flow-output"
            d="M1193 164L1270 137Q1288 131 1304 137L1370 160Q1392 168 1372 177L1301 201Q1284 207 1269 202L1193 177Q1178 171 1193 164Z"
            fill="none"
            stroke="#d8dfe6"
            strokeWidth="2"
            opacity="0"
          />
          {HERO_ROUTES.map((route, index) => (
            <g key={route}>
              <path
                ref={(node) => { routeRefs.current[index] = node; }}
                d={route}
                fill="none"
                stroke="none"
              />
              <g
                ref={(node) => { packetRefs.current[index] = node; }}
                className="flow-unit"
                opacity="0"
              >
                <path
                  d="M-22-10L9-17L25-6L-8 8Z"
                  fill={index === 1 ? "#b4bfcd" : "#e3e5e6"}
                  stroke="#f1f2f3"
                  strokeWidth="1"
                />
                <path d="M-9-5L9-9M-3 0L14-5" stroke="#69778b" strokeWidth="1.3" />
              </g>
            </g>
          ))}
        </svg>
      </figure>
      <button
        ref={replayRef}
        type="button"
        className="motion-replay"
        aria-label={isPlaying ? "개념 모션 멈추기" : "흩어진 입력이 정리되는 개념 모션 다시 보기"}
      >
        <span className="motion-label">{isPlaying ? homeCopy.motionStop : homeCopy.motionReplay}</span>
        <span aria-hidden="true">↻</span>
      </button>
    </>
  );
}

type ProjectMotionScene = {
  cover: HTMLElement;
  duration: number;
  tracks: { node: SVGElement; frames: Keyframe[] }[];
  visible: boolean;
  played: boolean;
  animations: Animation[];
};

export function useProjectMotion(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const scenes: ProjectMotionScene[] = [];
    let disposed = false;
    const packet = container.querySelector<SVGGElement>(".pm-ci-packet");
    const arm = container.querySelector<SVGPathElement>(".pm-ci-gate-arm");
    const route = container.querySelector<SVGPathElement>(".pm-pin-route");
    const ciCover = packet?.ownerSVGElement?.parentElement;
    const pinCover = route?.ownerSVGElement?.parentElement;

    if (packet && arm && ciCover && container.contains(ciCover) && ciCover.contains(arm)) {
      scenes.push({
        cover: ciCover,
        duration: 3400,
        visible: false,
        played: false,
        animations: [],
        tracks: [
          {
            node: packet,
            frames: [
              { transform: "translate(-162px, 80px)", offset: 0 },
              { transform: "translate(-162px, 80px)", offset: 0.08, easing: "ease-in-out" },
              { transform: "translate(-67px, 29px)", offset: 0.3 },
              { transform: "translate(-67px, 29px)", offset: 0.43, easing: "ease-in-out" },
              { transform: "translate(76px, -17px)", offset: 0.72, easing: "ease-out" },
              { transform: "translate(178px, -38px)", offset: 0.94 },
              { transform: "translate(178px, -38px)", offset: 1 },
            ].map((frame) => ({ ...frame, transformBox: "view-box", transformOrigin: "0 0" })),
          },
          {
            node: arm,
            frames: [
              { transform: "rotate(0deg)", offset: 0 },
              { transform: "rotate(0deg)", offset: 0.34, easing: "ease-in-out" },
              { transform: "rotate(68deg)", offset: 0.43 },
              { transform: "rotate(68deg)", offset: 0.72, easing: "ease-in-out" },
              { transform: "rotate(0deg)", offset: 0.84 },
              { transform: "rotate(0deg)", offset: 1 },
            ].map((frame) => ({ ...frame, transformBox: "view-box", transformOrigin: "421px 204px" })),
          },
        ],
      });
    }
    if (route && pinCover && container.contains(pinCover)) {
      scenes.push({
        cover: pinCover,
        duration: 2800,
        visible: false,
        played: false,
        animations: [],
        tracks: [{
          node: route,
          frames: [
            { strokeDashoffset: "1", offset: 0 },
            { strokeDashoffset: "1", offset: 0.06, easing: "ease-in-out" },
            { strokeDashoffset: "0", offset: 0.94 },
            { strokeDashoffset: "0", offset: 1 },
          ],
        }],
      });
    }

    const settle = (scene: ProjectMotionScene) => {
      const animations = scene.animations;
      scene.animations = [];
      // Cancelling exposes the completed geometry owned by the declarative SVG.
      for (const animation of animations) animation.cancel();
    };
    const play = (scene: ProjectMotionScene) => {
      if (disposed || preference.matches || document.hidden || !scene.visible
        || scene.animations.length || !scene.tracks.every(({ node }) => typeof node.animate === "function")) return;
      scene.played = true;
      const animations = scene.tracks.map(({ node, frames }) => node.animate(frames, {
        duration: scene.duration,
        iterations: 1,
        fill: "none",
      }));
      scene.animations = animations;
      Promise.all(animations.map((animation) => animation.finished)).then(() => {
        if (!disposed && scene.animations === animations) settle(scene);
      }, () => {});
    };
    const firstPlay = (scene: ProjectMotionScene) => {
      if (disposed || scene.played || !scene.visible || document.hidden) return;
      scene.played = true;
      play(scene);
    };
    const observer = new IntersectionObserver((entries) => {
      if (disposed) return;
      for (const entry of entries) {
        const scene = scenes.find(({ cover }) => cover === entry.target);
        if (!scene) continue;
        scene.visible = entry.isIntersecting && entry.intersectionRatio > 0;
        if (scene.visible) firstPlay(scene);
        else settle(scene);
      }
    }, { threshold: [0, 0.12] });
    const hoverListeners = scenes.map((scene) => {
      const onPointerEnter = (event: PointerEvent) => {
        if (fineHover.matches && event.pointerType !== "touch") play(scene);
      };
      observer.observe(scene.cover);
      scene.cover.addEventListener("pointerenter", onPointerEnter);
      return { cover: scene.cover, onPointerEnter };
    });
    const onPreferenceChange = () => {
      if (preference.matches) scenes.forEach(settle);
    };
    const onVisibilityChange = () => {
      if (disposed) return;
      if (document.hidden) scenes.forEach(settle);
      else scenes.forEach(firstPlay);
    };
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      observer.disconnect();
      for (const { cover, onPointerEnter } of hoverListeners) {
        cover.removeEventListener("pointerenter", onPointerEnter);
      }
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scenes.forEach(settle);
    };
  }, [containerRef]);
}
