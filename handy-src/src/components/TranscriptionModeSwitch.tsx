import React from "react";
import { useTranslation } from "react-i18next";
import { Mic, Volume2, Clipboard, Hand } from "lucide-react";
import type { AppSettings } from "@/bindings";
import { useSettings } from "../hooks/useSettings";
import { useOsType } from "../hooks/useOsType";

/**
 * Quick-control bar shown in the header. Each setting is a uniform two-option
 * "pill" (icon + segmented control) so the whole row reads as one consistent
 * block. One click flips the value — no need to dig into Settings.
 *
 * - Voz / Sistema: `live_mode` / `live_mode_system` (Normal ↔ En vivo).
 * - Salida: `clipboard_only` (Pegar ↔ Copiar al portapapeles).
 * - Activación: `push_to_talk` (Mantener pulsado ↔ Alternar).
 *
 * `live_mode_system` is Windows-only, so that pill is hidden elsewhere.
 */

type BoolSettingKey = Extract<
  keyof AppSettings,
  "live_mode" | "live_mode_system" | "clipboard_only" | "push_to_talk"
>;

interface QuickControl {
  key: BoolSettingKey;
  icon: typeof Mic;
  tooltipKey: string;
  /** Label for the `false` value (left segment). */
  offKey: string;
  /** Label for the `true` value (right segment). */
  onKey: string;
  windowsOnly?: boolean;
}

const CONTROLS: QuickControl[] = [
  {
    key: "live_mode",
    icon: Mic,
    tooltipKey: "header.mode.voice",
    offKey: "header.mode.normal",
    onKey: "header.mode.live",
  },
  {
    key: "live_mode_system",
    icon: Volume2,
    tooltipKey: "header.mode.system",
    offKey: "header.mode.normal",
    onKey: "header.mode.live",
    windowsOnly: true,
  },
  {
    key: "clipboard_only",
    icon: Clipboard,
    tooltipKey: "header.output.label",
    offKey: "header.output.paste",
    onKey: "header.output.clipboard",
  },
  {
    key: "push_to_talk",
    icon: Hand,
    tooltipKey: "header.activation.label",
    offKey: "header.activation.toggle",
    onKey: "header.activation.hold",
  },
];

export const TranscriptionModeSwitch: React.FC = () => {
  const { t } = useTranslation();
  const { settings, getSetting, updateSetting, isUpdating } = useSettings();
  const isLight = settings?.theme === "light";
  const isWindows = useOsType() === "windows";

  const renderControl = (control: QuickControl) => {
    const value = (getSetting(control.key) as boolean) || false;
    const updating = isUpdating(control.key);
    const Icon = control.icon;

    return (
      <div
        key={control.key}
        className="flex items-center gap-1.5"
        title={t(control.tooltipKey)}
      >
        <Icon
          className={`w-3.5 h-3.5 shrink-0 ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}
        />
        <div
          className={`flex items-center rounded-lg p-0.5 ${
            isLight ? "bg-slate-100" : "bg-white/[0.06]"
          } ${updating ? "opacity-50" : ""}`}
        >
          {[
            { on: false, label: t(control.offKey) },
            { on: true, label: t(control.onKey) },
          ].map((seg) => {
            const active = value === seg.on;
            return (
              <button
                key={seg.on ? "on" : "off"}
                type="button"
                disabled={updating}
                onClick={() => updateSetting(control.key, seg.on)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                  active
                    ? "bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                    : isLight
                      ? "text-slate-500 hover:text-slate-800"
                      : "text-slate-400 hover:text-slate-200"
                } ${updating ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {seg.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div data-tour="live-mode" className="flex items-center gap-3">
      {CONTROLS.filter((c) => isWindows || !c.windowsOnly).map(renderControl)}
    </div>
  );
};

export default TranscriptionModeSwitch;
