import React from "react";
import { Check } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useResolvedTheme } from "../hooks/useResolvedTheme";
import {
  ACCENT_PRESETS,
  DEFAULT_ACCENT,
} from "../lib/constants/accentColors";

interface AccentColorPickerProps {
  /** "sm" for the compact header row, "md" for the settings section. */
  size?: "sm" | "md";
}

/**
 * Row of preset accent-color swatches. Picking one persists `accent_color`,
 * which App.tsx maps onto the `--color-logo-primary` CSS variable, recoloring
 * the whole UI. Shared by the header (compact) and the Themes section.
 */
export const AccentColorPicker: React.FC<AccentColorPickerProps> = ({
  size = "md",
}) => {
  const { settings, updateSetting } = useSettings();
  const isLight = useResolvedTheme() === "light";
  const current = (settings?.accent_color ?? DEFAULT_ACCENT).toLowerCase();

  const dot = size === "sm" ? "w-4 h-4" : "w-7 h-7";
  const ringOffset = isLight ? "ring-offset-white" : "ring-offset-[#0c0d12]";

  return (
    <div className="flex items-center gap-2">
      {ACCENT_PRESETS.map((preset) => {
        const active = preset.color.toLowerCase() === current;
        return (
          <button
            key={preset.id}
            type="button"
            aria-label={preset.id}
            onClick={() => updateSetting("accent_color", preset.color)}
            style={{ backgroundColor: preset.color }}
            className={`${dot} rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
              active
                ? `ring-2 ring-offset-2 ${ringOffset} ring-current scale-110`
                : ""
            }`}
          >
            {active && size === "md" && (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AccentColorPicker;
