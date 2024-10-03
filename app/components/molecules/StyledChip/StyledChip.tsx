import React from "react";
import Link from "next/link";

interface StyledChipProps {
  label: string;
  value: string | number | null | undefined; // Allow null or undefined
  backgroundColor: string;
  textColor: string;
  isPhoneNumber?: boolean; // New prop to specify if value is a phone number
}

const StyledChip: React.FC<StyledChipProps> = ({
  label,
  value,
  backgroundColor,
  textColor,
  isPhoneNumber = false, // Default to false
}) => {
  // Return null if there is no valid value to display
  if (value === null || value === undefined || value === "") {
    return null;
  }

  // Check if value is a phone number and contains masking (e.g., starts or contains '*')
  const isMasked = typeof value === "string" && value.includes("*");

  // Conditionally render phone number as a clickable link if it's not masked
  return (
    <p className={`inline-block px-3 py-1 rounded-sm mr-3 border`}>
      <strong className={`text-green-800`}>{label}:</strong>{" "}
      {isPhoneNumber && !isMasked ? (
        <Link href={`tel:${value}`} className={`text-green-800 underline`}>
          {value}
        </Link>
      ) : (
        <span className={"text-green-800"}>{value}</span>
      )}
    </p>
  );
};

export default StyledChip;
