import React from "react";

const HealingIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <g transform="rotate(45 12 12)">
      <rect x="3" y="9" width="18" height="6" rx="3" fill="#ff4000" stroke="#ff4000" strokeWidth="1.25" />
      {/* Black dots for bandage holes */}
      <circle cx="7" cy="12" r="0.75" fill="#222" />
      <circle cx="12" cy="12" r="0.75" fill="#222" />
      <circle cx="17" cy="12" r="0.75" fill="#222" />
      {/* Bandage border */}
      <rect x="3" y="9" width="18" height="6" rx="3" fill="none" stroke="#222" strokeWidth="1.25" />
    </g>
  </svg>
);

export default HealingIcon;
