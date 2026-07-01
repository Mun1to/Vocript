import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { commands } from "@/bindings";
import { useSettings } from "./useSettings";

/**
 * Returns the EFFECTIVE theme ("light" | "dark"). When the user's setting is
 * "system", it resolves the OS theme by asking the backend (which reads the
 * Windows registry, because WebView2 does not reliably expose
 * `prefers-color-scheme`) and follows live OS changes.
 *
 * Use this anywhere a component needs to know whether to render light or dark
 * (Header, Sidebar, …) instead of comparing `settings.theme === "light"`, which
 * is wrong for the "system" mode (it would treat "system" as dark).
 */
export const useResolvedTheme = (): "light" | "dark" => {
  const { settings } = useSettings();
  const theme = settings?.theme ?? "system";
  const [osTheme, setOsTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme !== "system") return;
    let cancelled = false;
    let unlisten: (() => void) | undefined;
    const sync = async () => {
      try {
        const os = await commands.getSystemTheme();
        if (!cancelled) setOsTheme(os === "light" ? "light" : "dark");
      } catch {
        if (!cancelled) setOsTheme("dark");
      }
    };
    sync();
    getCurrentWindow()
      .onThemeChanged(() => sync())
      .then((fn) => {
        if (cancelled) fn();
        else unlisten = fn;
      });
    return () => {
      cancelled = true;
      unlisten?.();
    };
  }, [theme]);

  return theme === "system" ? osTheme : (theme as "light" | "dark");
};
