import React from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Monitor } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useResolvedTheme } from "../hooks/useResolvedTheme";
import { TranscriptionModeSwitch } from "./TranscriptionModeSwitch";
import { ProfileSelect } from "./ProfileSelect";
import { LanguageQuickSwitch } from "./LanguageQuickSwitch";
import { SECTIONS_CONFIG, type SidebarSection } from "./Sidebar";
import type { AppTheme } from "@/bindings";

interface HeaderProps {
  currentSection: SidebarSection;
}

export const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const { t } = useTranslation();
  const { settings, updateSetting } = useSettings();

  const isLight = useResolvedTheme() === "light";

  // Header toggle cycles through the three real settings (system → light →
  // dark) so "system" stays reachable; the button shows the current mode.
  const theme: AppTheme = settings?.theme ?? "system";
  const cycleTheme = () => {
    const order: AppTheme[] = ["system", "light", "dark"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    updateSetting("theme", next);
  };
  const themeMeta = {
    system: {
      icon: <Monitor className="w-3.5 h-3.5 text-blue-500" />,
      label: t("header.systemMode"),
    },
    light: {
      icon: <Sun className="w-3.5 h-3.5 text-amber-400" />,
      label: t("header.lightMode"),
    },
    dark: {
      icon: <Moon className="w-3.5 h-3.5 text-blue-600" />,
      label: t("header.darkMode"),
    },
  }[theme];

  return (
    <header
      className={`h-14 border-b px-6 flex items-center gap-4 shrink-0 select-none transition-colors duration-200 ${
        isLight ? "bg-white border-slate-200" : "bg-[#0c0d12] border-white/10"
      }`}
    >
      {/* Left: active section title (flex-1 so the center group stays centered) */}
      <div className="flex-1 min-w-0 flex items-center gap-2.5">
        <span className="w-1.5 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        <span
          className={`text-xs font-bold uppercase tracking-wider truncate ${
            isLight ? "text-slate-900" : "text-slate-200"
          }`}
        >
          {t(SECTIONS_CONFIG[currentSection].labelKey)}
        </span>
      </div>

      {/* Center: profile + control pills + language, grouped together */}
      <div className="flex items-center gap-3">
        <ProfileSelect />
        <TranscriptionModeSwitch />
        <LanguageQuickSwitch />
      </div>

      {/* Right: theme (flex-1, pushed to the end) */}
      <div className="flex-1 min-w-0 flex items-center justify-end gap-3">
        <button
          type="button"
          data-tour="header-theme"
          onClick={cycleTheme}
          title={themeMeta.label}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
            isLight
              ? "text-slate-800 hover:bg-slate-100"
              : "text-slate-200 hover:bg-white/[0.06]"
          }`}
        >
          {themeMeta.icon}
          <span>{themeMeta.label}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
