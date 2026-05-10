"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import type { Lang } from "@/lib/site-data";

type Theme = "light" | "dark";

const storageKey = "altec-theme";
const themeChangeEvent = "altec-theme-change";

function resolveTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToThemeChanges(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if (!window.localStorage.getItem(storageKey)) {
      callback();
    }
  };

  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  mediaQuery.addEventListener("change", handleSystemChange);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
    mediaQuery.removeEventListener("change", handleSystemChange);
  };
}

export function ThemeToggle({ lang }: { lang: Lang }) {
  const theme = useSyncExternalStore(subscribeToThemeChanges, resolveTheme, getServerThemeSnapshot);
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = isDark ? "light" : "dark";
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      aria-label={lang === "zh" ? "切换深色或浅色模式" : "Toggle dark or light mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="relative inline-grid h-9 w-[4.5rem] grid-cols-2 items-center border border-line-strong bg-panel p-0.5 text-copy-muted transition hover:border-line-strong"
    >
      <span
        className={`pointer-events-none absolute left-0.5 top-0.5 h-8 w-[2.125rem] bg-action transition-transform duration-200 ${
          isDark ? "translate-x-[2.125rem]" : "translate-x-0"
        }`}
      />
      <span className={`relative z-10 grid h-8 place-items-center ${isDark ? "text-copy-subtle" : "text-action-contrast"}`}>
        <Sun size={16} />
      </span>
      <span className={`relative z-10 grid h-8 place-items-center ${isDark ? "text-action-contrast" : "text-copy-subtle"}`}>
        <Moon size={16} />
      </span>
    </button>
  );
}
