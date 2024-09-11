import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, ...props }) => (
  <label
    className="block text-sm text-[rgba(0,0,0,.87)]"
    htmlFor={htmlFor}
    {...props}
  >
    {text}
  </label>
);

export default Label;
