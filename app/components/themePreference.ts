export type Theme = "light" | "dark";

export const THEME_KEY = "thisnorm-color-mode";
const THEME_EVENT = "portfolio-theme-change";
const palettes = {
  light: { palette: "paper", color: "#e9e6dd" },
  dark: { palette: "umber", color: "#29251f" },
};

export function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

export function getThemeSnapshot(): Theme {
  return typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getServerTheme(): Theme {
  return "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.palette = palettes[theme].palette;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palettes[theme].color);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

// Runs before hydration so the saved or OS theme is used for the first paint.
export const themeBootstrap = `(function(){var p=null;try{var s=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(s==='light'||s==='dark')p=s;}catch{}var t=p||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var c=${JSON.stringify(palettes)}[t];var r=document.documentElement;r.dataset.theme=t;r.dataset.palette=c.palette;r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=c.color;})();`;
