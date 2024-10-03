import React from "react";
import Select, { ActionMeta, SingleValue, MultiValue } from "react-select";
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
  onChange?: (selected: SelectOption[] | SelectOption | null) => void; // Callback to handle changes
  id: string;
  name: string;
  isSearchable?: boolean;
  defaultValue?: string;
}

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    width: "100%", // Full width
    backgroundColor: "white", // Background color
    borderColor: state.isFocused ? "#FBBF24" : "#D1D5DB", // Border color based on focus
    borderWidth: "1px", // Border width
    paddingTop: "3px",
    paddingBottom: "3px",
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
  isSearchable = false,
  defaultValue,
}) => {
  // Transform string[] into SelectOption[] if necessary
  const transformedOptions = options?.map((option) =>
    typeof option === "string"
      ? { value: option, label: option } // Convert string to SelectOption
      : option
  ) as SelectOption[];

  // Handle the onChange event for react-select
  const handleChange = (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (onChange) {
      // If it's multi-select, newValue will be an array (MultiValue), otherwise SingleValue
      if (isMulti) {
        onChange(newValue as SelectOption[]); // Cast newValue as SelectOption[]
      } else {
        onChange(newValue as SelectOption); // Cast newValue as SelectOption (single)
      }
    }
  };

  return (
    <div className="mt-2">
      <Select
        closeMenuOnSelect={!isMulti}
        components={animatedComponents}
        options={transformedOptions}
        placeholder={placeholder}
        isMulti={isMulti}
        required={required}
        styles={customStyles}
        id={id}
        name={name}
        isSearchable={isSearchable}
        onChange={handleChange} // Updated handler
        menuShouldScrollIntoView
        {...(defaultValue
          ? { defaultValue: { label: defaultValue, value: defaultValue } }
          : {})}
      />
    </div>
  );
};

export default CustomSelect;
