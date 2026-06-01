import React from "react";

const HandyTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  const h = height ?? (width ? Math.round(width * 0.35) : 120);
  const w = width ?? 340;

  return (
    <svg
      width={w}
      height={h}
      className={className}
      viewBox="0 0 340 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="170"
        y="95"
        textAnchor="middle"
        fontSize="100"
        fontWeight="900"
        fontFamily="'Arial Rounded MT Bold', 'Nunito', 'Varela Round', system-ui, sans-serif"
        fill="var(--color-logo-primary)"
        stroke="var(--color-logo-stroke)"
        strokeWidth="4"
        paintOrder="stroke"
      >
        MuVox
      </text>
    </svg>
  );
};

export default HandyTextLogo;
