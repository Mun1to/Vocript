import React from "react";
import { useTranslation } from "react-i18next";
import { Mic, Volume2, Clipboard, Hand, ChevronDown } from "lucide-react";
import type { AppSettings } from "@/bindings";
import { useSettings } from "../hooks/useSettings";
import { useResolvedTheme } from "../hooks/useResolvedTheme";
import { useOsType } from "../hooks/useOsType";

/**
 * Quick-control bar shown in the header. Each setting is a compact button that
 * always shows its *current* value highlighted in blue (with a glow). Hovering
 * opens a small dropdown with the two options stacked together; clicking one
 * sets it. The trigger stays narrow (icon + value) so the row keeps roughly the
 * same width across all 20 UI languages, and the dropdown carries a tiny title
 * so you know which control it is.
 *
 * - Voz / Sistema: `live_mode` / `live_mode_system` (Normal ↔ En vivo).
 * - Salida: `clipboard_only` (Pegar ↔ Copiar al portapapeles).
 * - Activación: `push_to_talk` (Mantener pulsado ↔ Alternar).
 *
 * `live_mode_system` is Windows-only, so that chip is hidden elsewhere.
 */

type BoolSettingKey = Extract<
  keyof AppSettings,
  "live_mode" | "live_mode_system" | "clipboard_only" | "push_to_talk"
>;

interface QuickControl {
  key: BoolSettingKey;
  icon: typeof Mic;
  /** Title shown inside the dropdown (e.g. "Voz", "Sistema"). */
  labelKey: string;
  /** `data-tour` anchor so the guided tour can spotlight this control on its own. */
  tour: string;
  /** Label for the `false` value. */
  offKey: string;
  /** Label for the `true` value. */
  onKey: string;
  windowsOnly?: boolean;
}

const CONTROLS: QuickControl[] = [
  {
    key: "live_mode",
    icon: Mic,
    labelKey: "header.mode.voice",
    tour: "header-voice",
    offKey: "header.mode.normal",
    onKey: "header.mode.live",
  },
  {
    key: "live_mode_system",
    icon: Volume2,
    labelKey: "header.mode.system",
    tour: "header-system",
    offKey: "header.mode.normal",
    onKey: "header.mode.live",
    windowsOnly: true,
  },
  {
    key: "clipboard_only",
    icon: Clipboard,
    labelKey: "header.output.label",
    tour: "header-output",
    offKey: "header.output.paste",
    onKey: "header.output.clipboard",
  },
  {
    key: "push_to_talk",
    icon: Hand,
    labelKey: "header.activation.label",
    tour: "header-activation",
    offKey: "header.activation.toggle",
    onKey: "header.activation.hold",
  },
];

export const TranscriptionModeSwitch: React.FC = () => {
  const { t } = useTranslation();
  const { settings, getSetting, updateSetting, isUpdating } = useSettings();
  const isLight = useResolvedTheme() === "light";
  const isWindows = useOsType() === "windows";

  const renderControl = (control: QuickControl) => {
    const value = (getSetting(control.key) as boolean) || false;
    const updating = isUpdating(control.key);
    const Icon = control.icon;
    const currentLabel = t(value ? control.onKey : control.offKey);

    const optionClass = (active: boolean) =>
      `block w-full text-center px-4 py-2 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
        active
          ? "bg-blue-600 text-white shadow-[0_0_10px_1px_rgba(37,99,235,0.55)]"
          : isLight
            ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
      } ${updating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;

    return (
      <div key={control.key} data-tour={control.tour} className="relative group">
        <div
          title={t(control.labelKey)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-blue-600 text-white shadow-[0_0_11px_1px_rgba(37,99,235,0.55)] select-none"
        >
          <Icon className="w-3.5 h-3.5 shrink-0" />
          <span>{currentLabel}</span>
          <ChevronDown className="w-3 h-3 opacity-80 transition-transform group-hover:rotate-180" />
        </div>
        {/* `top-full` pega el menú al trigger (sin hueco) y el `pt-[5px]`
            transparente actúa de puente: al bajar el ratón hacia las opciones
            sigues sobre un descendiente del `group`, así que el hover no se
            pierde y el desplegable no se cierra a mitad de camino. */}
        <div className="hidden group-hover:block absolute top-full left-0 min-w-full z-30 pt-[5px]">
          <div
            className={`p-1 rounded-xl border ${
              isLight ? "bg-white border-slate-200" : "bg-[#15161c] border-white/10"
            }`}
          >
            <div
              className={`text-[9px] uppercase tracking-wider text-center pt-0.5 pb-1.5 ${
                isLight ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {t(control.labelKey)}
            </div>
            <button
              type="button"
              disabled={updating}
              onClick={() => updateSetting(control.key, false)}
              className={optionClass(!value)}
            >
              {t(control.offKey)}
            </button>
            <button
              type="button"
              disabled={updating}
              onClick={() => updateSetting(control.key, true)}
              className={`mt-0.5 ${optionClass(value)}`}
            >
              {t(control.onKey)}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {CONTROLS.filter((c) => isWindows || !c.windowsOnly).map(renderControl)}
    </div>
  );
};

export default TranscriptionModeSwitch;
