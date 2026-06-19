import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="space-y-2">
      {title && (
        <div className="px-1">
          <h2 className="flex items-center gap-2 text-xs font-semibold text-mid-gray uppercase tracking-wide">
            <span className="h-3 w-1 rounded-full bg-background-ui" />
            {title}
          </h2>
          {description && (
            <p className="text-xs text-mid-gray mt-1 ms-3">{description}</p>
          )}
        </div>
      )}
      <div className="bg-background border border-mid-gray/15 rounded-xl shadow-sm overflow-visible">
        <div className="divide-y divide-mid-gray/15">{children}</div>
      </div>
    </div>
  );
};
