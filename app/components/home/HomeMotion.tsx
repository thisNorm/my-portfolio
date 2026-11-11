"use client";

import { useEffect } from "react";
import { mountConveyor } from "./conveyor";
import { startScenes } from "./scenes";

// Client island: mounts the WebGL conveyor and the scroll scenes on the server-rendered home markup.
export default function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const canvas = document.getElementById("conveyor");
    const conveyor = canvas instanceof HTMLCanvasElement ? mountConveyor(canvas) : null;
    const controller = new AbortController();
    startScenes(conveyor, controller.signal);
    return () => {
      controller.abort();
      conveyor?.dispose();
      root.classList.remove("motion-ready", "scroll-scenes-ready", "scenes-on");
    };
  }, []);
  return null;
}
