import React from "react";

type CheckboxProps = {
  id: string;
  name: string;
  checked?: boolean; // Optional: If you want to control the checked state
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle changes
  disabled?: boolean; // Optional: To disable the checkbox
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  disabled,
}) => (
  <input
    type="checkbox"
    id={id}
    name={name}
    checked={checked}
    onChange={onChange}
    disabled={disabled}
    className="form-check-input mr-2"
  />
);

export default Checkbox;
