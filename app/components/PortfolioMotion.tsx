"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { homeCopy } from "./portfolioData";

const HERO_DURATION = 3660;
const HERO_STREAMS = [
  { path: "M312 727C340 713 357 700 378 702L446 727Q480 739 480 712V667Q481 651 496 642L548 620", start: 0, duration: 1310 },
  { path: "M442 773L496 750Q511 743 511 729V679Q511 659 530 647L566 629", start: 150, duration: 1220 },
  { path: "M910 460L1025 412", start: 1500, duration: 650 },
  { path: "M1084 389L1131 368Q1147 363 1147 351V346Q1147 334 1164 327L1226 304", start: 2230, duration: 780 },
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const pulse = (time: number, start: number, duration: number) => {
  const progress = (time - start) / duration;
  return progress > 0 && progress < 1 ? Math.sin(progress * Math.PI) : 0;
};

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

    const packets = HERO_STREAMS.flatMap(({ start, duration }, index) => {
      const route = routeRefs.current[index];
      const node = packetRefs.current[index];
      return route && node
        ? [{ route, node, start, duration, length: route.getTotalLength() }]
        : [];
    });
    if (packets.length !== HERO_STREAMS.length) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let playing = false;
    let visible = false;
    let seen = false;
    let raf = 0;

    const render = (time: number) => {
      for (const packet of packets) {
        const progress = (time - packet.start) / packet.duration;
        const t = clamp(progress);
        const point = packet.route.getPointAtLength(t * packet.length);
        const fade = clamp(t / 0.07) * clamp((1 - t) / 0.12);
        packet.node.style.transform = `translate(${point.x}px, ${point.y}px)`;
        packet.node.style.opacity =
          progress >= 0 && progress <= 1 ? String(fade * 0.88) : "0";
      }
      const first = packets[0];
      const head = clamp(time / first.duration);
      trace.style.strokeDasharray = `60 ${first.length}`;
      trace.style.strokeDashoffset = String(-head * first.length + 60);
      trace.style.opacity = String(pulse(time, 0, first.duration) * 0.62);
      gate.style.opacity = String(pulse(time, 1930, 620) * 0.8);
      output.style.opacity = String(pulse(time, 2910, 650) * 0.72);
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
        aria-label="흩어진 입력이 층을 따라 합쳐지고 검증을 거치는 개념 그래픽"
      >
        <Image
          src="/portfolio/hero-spatial.png"
          alt=""
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 600px) 100vw, (max-width: 980px) 90vw, (max-width: 1430px) 850px, (max-width: 1900px) 71vw, 1320px"
        />
        <svg className="hero-flow" viewBox="0 0 1536 1024" aria-hidden="true" focusable="false">
          <path
            ref={traceRef}
            className="flow-trace"
            d={HERO_STREAMS[0].path}
            fill="none"
            stroke="#bcecdf"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0"
          />
          <path
            ref={gateRef}
            className="flow-gate"
            d="M1005 361l13 17 24-22"
            fill="none"
            stroke="#d9fff2"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          <path
            ref={outputRef}
            className="flow-output"
            d="M1204 207L1247 192Q1259 187 1271 192L1325 207Q1340 213 1324 220L1278 239Q1267 244 1256 240L1205 225Q1190 219 1204 207Z"
            fill="none"
            stroke="#bcecdf"
            strokeWidth="2"
            opacity="0"
          />
          {HERO_STREAMS.map(({ path: route }, index) => (
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
                <circle r="5.8" fill="#d6f8ea" stroke="#6eb2ab" strokeWidth="1.6" />
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
