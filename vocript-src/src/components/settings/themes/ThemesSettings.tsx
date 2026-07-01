import React from "react";
import { useTranslation } from "react-i18next";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { AccentColorPicker } from "../../AccentColorPicker";

/**
 * "Custom themes" section. First version: pick the UI accent color. Typography
 * and more are planned for a later pass.
 */
export const ThemesSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup title={t("themes.title")}>
        <div className="p-5 flex flex-col gap-4">
          <p className="text-sm text-text/70">{t("themes.subtitle")}</p>
          <AccentColorPicker size="md" />
          <p className="text-xs text-text/45">{t("themes.comingSoon")}</p>
        </div>
      </SettingsGroup>
    </div>
  );
};

export default ThemesSettings;
