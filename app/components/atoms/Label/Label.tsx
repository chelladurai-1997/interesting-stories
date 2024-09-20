import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  disabled?: boolean; // Adding the disabled prop
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, disabled, ...props }) => (
  <label
    className={`block text-sm ${
      disabled ? "text-gray-400" : "text-[rgba(0,0,0,.87)]"
    }`} // Updated color for disabled state
    htmlFor={htmlFor}
    {...(disabled ? {} : props)}
  >
    {text}
  </label>
);

export default Label;
