import React from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "../ui/Slider";
import { useSettings } from "../../hooks/useSettings";

export const VolumeSlider: React.FC<{ disabled?: boolean }> = ({
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { getSetting, updateSetting } = useSettings();
  // Sanea valores heredados fuera de la escala 0–1 (p. ej. 80 de una escala
  // antigua 0–100, que se mostraba como 8000%): los reescala y acota a [0, 1].
  const rawVolume = getSetting("audio_feedback_volume") ?? 1;
  const audioFeedbackVolume =
    rawVolume > 1 ? Math.min(rawVolume / 100, 1) : Math.max(rawVolume, 0);

  return (
    <Slider
      value={audioFeedbackVolume}
      onChange={(value: number) =>
        updateSetting("audio_feedback_volume", value)
      }
      min={0}
      max={1}
      label={t("settings.sound.volume.title")}
      description={t("settings.sound.volume.description")}
      descriptionMode="tooltip"
      grouped
      formatValue={(value) => `${Math.round(value * 100)}%`}
      disabled={disabled}
    />
  );
};
