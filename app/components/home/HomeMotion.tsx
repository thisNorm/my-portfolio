"use client";

import { useEffect } from "react";
import { startScenes } from "./scenes";

// Same breakpoint the hero motion uses; below it the server-rendered poster stands in for the 3D scene.
const SCENE_QUERY = "(min-width: 721px) and (min-height: 640px)";

// Client island: mounts the WebGL conveyor and the scroll scenes on the server-rendered home markup.
// three.js is loaded only on screens that show the live scene, after the page is interactive.
export default function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const controller = new AbortController();
    let conveyor: { dispose(): void } | null = null;
    const start = (scene: Parameters<typeof startScenes>[0]) => {
      if (controller.signal.aborted) return;
      startScenes(scene, controller.signal);
    };
    const canvas = document.getElementById("conveyor");
    if (canvas instanceof HTMLCanvasElement && matchMedia(SCENE_QUERY).matches) {
      // Only a failed chunk load falls back to the poster; errors in the scenes themselves must surface.
      import("./conveyor").then(
        ({ mountConveyor }) => {
          if (controller.signal.aborted) return;
          conveyor = mountConveyor(canvas);
          start(conveyor);
        },
        () => start(null),
      );
    } else {
      start(null);
    }
    return () => {
      controller.abort();
      conveyor?.dispose();
      root.classList.remove("motion-ready", "scroll-scenes-ready", "scenes-on");
    };
  }, []);
  return null;
}
