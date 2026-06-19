import React from "react";
import { useTranslation } from "react-i18next";
import {
  Cog,
  FlaskConical,
  History,
  Info,
  Sparkles,
  Cpu,
  AudioLines,
  FileAudio,
} from "lucide-react";
import HandyTextLogo from "./icons/HandyTextLogo";
import { useSettings } from "../hooks/useSettings";
import {
  GeneralSettings,
  AdvancedSettings,
  HistorySettings,
  DebugSettings,
  AboutSettings,
  PostProcessingSettings,
  ModelsSettings,
  FileTranscription,
} from "./settings";

export type SidebarSection = keyof typeof SECTIONS_CONFIG;

interface IconProps {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

interface SectionConfig {
  labelKey: string;
  icon: React.ComponentType<IconProps>;
  component: React.ComponentType;
  enabled: (settings: any) => boolean;
}

export const SECTIONS_CONFIG = {
  general: {
    labelKey: "sidebar.general",
    icon: AudioLines,
    component: GeneralSettings,
    enabled: () => true,
  },
  models: {
    labelKey: "sidebar.models",
    icon: Cpu,
    component: ModelsSettings,
    enabled: () => true,
  },
  file: {
    labelKey: "sidebar.fileTranscription",
    icon: FileAudio,
    component: FileTranscription,
    enabled: () => true,
  },
  advanced: {
    labelKey: "sidebar.advanced",
    icon: Cog,
    component: AdvancedSettings,
    enabled: () => true,
  },
  history: {
    labelKey: "sidebar.history",
    icon: History,
    component: HistorySettings,
    enabled: () => true,
  },
  postprocessing: {
    labelKey: "sidebar.postProcessing",
    icon: Sparkles,
    component: PostProcessingSettings,
    enabled: (settings) => settings?.post_process_enabled ?? false,
  },
  debug: {
    labelKey: "sidebar.debug",
    icon: FlaskConical,
    component: DebugSettings,
    enabled: (settings) => settings?.debug_mode ?? false,
  },
  about: {
    labelKey: "sidebar.about",
    icon: Info,
    component: AboutSettings,
    enabled: () => true,
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const availableSections = Object.entries(SECTIONS_CONFIG)
    .filter(([_, config]) => config.enabled(settings))
    .map(([id, config]) => ({ id: id as SidebarSection, ...config }));

  return (
    <div className="flex flex-col w-48 h-full shrink-0 border-e border-mid-gray/15 bg-mid-gray/5">
      <div className="flex flex-col items-center px-4 pt-5 pb-4">
        <HandyTextLogo width={128} />
      </div>
      <div className="mx-3 mb-2 h-px bg-gradient-to-r from-transparent via-mid-gray/30 to-transparent" />
      <nav className="flex flex-col gap-1 px-2.5 py-1 overflow-y-auto">
        {availableSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              title={t(section.labelKey)}
              className={`group relative flex items-center gap-2.5 w-full rounded-lg ps-3 pe-2 py-2 text-start transition-all ${
                isActive
                  ? "bg-background-ui text-white shadow-sm shadow-background-ui/30"
                  : "text-text/70 hover:bg-mid-gray/15 hover:text-text"
              }`}
            >
              {isActive && (
                <span className="absolute start-0 top-1.5 bottom-1.5 w-1 rounded-full bg-white/80" />
              )}
              <Icon
                width={20}
                height={20}
                className={`shrink-0 ${
                  isActive ? "" : "text-logo-primary group-hover:text-text"
                }`}
              />
              <span className="text-sm font-medium truncate">
                {t(section.labelKey)}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
