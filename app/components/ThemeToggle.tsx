"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { applyTheme, getServerTheme, getThemeSnapshot, readSavedTheme, subscribeTheme, THEME_KEY } from "./themePreference";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);
  const manualChoice = useRef(false);
  const label = theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";

  useEffect(() => {
    manualChoice.current = readSavedTheme() !== null;
    applyTheme(getThemeSnapshot());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = (event: MediaQueryListEvent) => {
      if (!manualChoice.current) applyTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  function toggleTheme() {
    const next = getThemeSnapshot() === "dark" ? "light" : "dark";
    manualChoice.current = true;
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* In-page switching works without storage. */ }
  }

  return (
    <button id="theme-toggle" className="theme-toggle" type="button" aria-label={label} title={label} onClick={toggleTheme}>
      <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.2 14.2A8.7 8.7 0 0 1 9.8 3.8a8.7 8.7 0 1 0 10.4 10.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
      <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
    </button>
  );
}
