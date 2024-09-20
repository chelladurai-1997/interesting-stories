import React from "react";

interface StyledChipProps {
  label: string;
  value: string | number | null | undefined; // Allow null or undefined
  backgroundColor: string;
  textColor: string;
}

const StyledChip: React.FC<StyledChipProps> = ({
  label,
  value,
  backgroundColor,
  textColor,
}) => {
  // Return null if there is no valid value to display
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <p className={`inline-block px-3 py-1 rounded-sm mr-3 ${backgroundColor}`}>
      <strong className={`${textColor}`}>{label}:</strong> {value}
    </p>
  );
};

export default StyledChip;
