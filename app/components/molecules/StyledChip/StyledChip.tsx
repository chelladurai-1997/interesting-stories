import React from "react";

interface StyledChipProps {
  label: string;
  value: string | number;
  backgroundColor: string;
  textColor: string;
}

const StyledChip: React.FC<StyledChipProps> = ({
  label,
  value,
  backgroundColor,
  textColor,
}) => {
  return (
    <p
      className={`inline-block px-3 py-1 rounded-full ${backgroundColor} ${textColor}`}
    >
      <strong>{label}:</strong> {value}
    </p>
  );
};

export default StyledChip;
