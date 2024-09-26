import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options?: SelectOption[] | string[];
  placeholder: string;
  required?: boolean;
  isMulti?: boolean; // For multi-select
  onChange?: (selected: SelectOption[]) => void; // Callback to handle changes
  id: string;
  name: string;
}

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    width: "100%", // Full width
    backgroundColor: "white", // Background color
    borderColor: state.isFocused ? "#FBBF24" : "#D1D5DB", // Border color based on focus
    borderWidth: "1px", // Border width
    borderRadius: "0.375rem", // Rounded corners
    boxShadow: state.isFocused ? "0 0 0 1px #FBBF24" : provided.boxShadow, // Focus ring
    outline: "none", // Remove default outline
    "&:hover": {
      borderColor: "", // Border color on hover
    },
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    transition: "transform 0.2s", // Smooth rotation transition
  }),
  indicatorSeparator: () => ({
    display: "none", // Hide the separator
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#FBBF24"
      : state.isFocused
      ? "#FEEBC8"
      : provided.backgroundColor, // Selected and focused colors
    color: state.isSelected ? "white" : provided.color, // Change text color on select
    "&:active": {
      backgroundColor: "#D97706", // Active state color
    },
  }),
};

const CustomSelect: React.FC<SelectProps> = ({
  options,
  placeholder,
  required = true,
  isMulti = false,
  id,
  name,
  onChange,
}) => {
  return (
    <div className="mt-2">
      <Select
        closeMenuOnSelect={!isMulti}
        components={animatedComponents}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        required={required}
        styles={customStyles}
        id={id}
        name={name}
      />
    </div>
  );
};

export default CustomSelect;
