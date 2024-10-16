interface IconButtonProps {
  onClick: () => void;
  animate?: boolean;
  icon?: React.ReactNode; // Allow passing any icon
  bgColor?: string; // Customize background color
  width?: string; // Customize width
  height?: string; // Customize height
  hoverBgColor?: string; // Customize hover background color
  focusRing?: string; // Customize focus ring color
  iconSize?: string; // Customize icon size (e.g., 'w-6 h-6')
  ariaLabel?: string; // Accessibility label
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  animate,
  icon,
  bgColor,
  width,
  height,
  hoverBgColor,
  focusRing,
  iconSize,
  ariaLabel,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center text-white ${bgColor} rounded-full ${width} ${height} ${hoverBgColor} focus:ring-4 ${focusRing} ${
      animate ? "ring-4 ring-gray-300 outline-none" : ""
    } focus:outline-none transition-all duration-300`}
    aria-label={ariaLabel}
  >
    {/* Icon or SVG */}
    {icon ? (
      icon
    ) : (
      <svg
        className={`${iconSize} text-white`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16M4 10h12M4 16h8" />
      </svg>
    )}
    <span className="sr-only">{ariaLabel}</span>
  </button>
);
