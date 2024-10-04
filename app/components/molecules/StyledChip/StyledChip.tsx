import React from "react";
import Link from "next/link";

interface StyledChipProps {
  label: string;
  value: string | number | null | undefined; // Allow null or undefined
  backgroundColor?: string; // Optional if you want background color customization
  textColor?: string; // Optional if you want text color customization
  isPhoneNumber?: boolean; // New prop to specify if value is a phone number
}

const StyledChip: React.FC<StyledChipProps> = ({
  label,
  value,
  backgroundColor = "bg-gray-100", // Optional default background color
  textColor = "text-gray-800", // Optional default text color
  isPhoneNumber = false, // Default to false
}) => {
  // Return null if there is no valid value to display
  if (value === null || value === undefined || value === "") {
    return null;
  }

  // Check if value is a phone number and contains masking (e.g., starts or contains '*')
  const isMasked = typeof value === "string" && value.includes("*");

  return (
    <p
      className={`inline-block px-3 py-1 rounded-sm mr-3 ${"bg-gray-100"} border`}
    >
      <strong className={`text-gray-500`}>{label}:</strong>{" "}
      {isPhoneNumber && !isMasked ? (
        <Link href={`tel:${value}`} className={`text-blue-600 underline`}>
          {value}
        </Link>
      ) : (
        <span className={`${"text-gray-800"} font-medium`}>{value}</span>
      )}
    </p>
  );
};

export default StyledChip;
