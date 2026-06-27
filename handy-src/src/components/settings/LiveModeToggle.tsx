import React from "react";
import { useTranslation } from "react-i18next";
import type { AppSettings } from "@/bindings";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";

interface LiveModeToggleProps {
  /** Which source this toggle controls. */
  variant: "voice" | "system";
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

/**
 * Toggle "modo en vivo" per source. When on, the existing shortcut for that
 * source (dictation for voice, system-audio for system) shows the live capsule
 * — the text appears as it plays — instead of the normal one-shot transcription.
 * There is no dedicated live keyboard shortcut; live can also be started from
 * the tray. Voice and system audio are independent.
 */
export const LiveModeToggle: React.FC<LiveModeToggleProps> = React.memo(
  ({ variant, descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const settingKey: keyof AppSettings =
      variant === "voice" ? "live_mode" : "live_mode_system";

    const enabled = (getSetting(settingKey) as boolean) || false;

    return (
      <ToggleSwitch
        checked={enabled}
        onChange={(value) => updateSetting(settingKey, value)}
        isUpdating={isUpdating(settingKey)}
        label={t(`settings.general.liveMode.${variant}.label`)}
        description={t(`settings.general.liveMode.${variant}.description`)}
        descriptionMode={descriptionMode}
        grouped={grouped}
      />
    );
  },
);

LiveModeToggle.displayName = "LiveModeToggle";
