import React from "react";
import Label from "../../atoms/Label/Label";
import Select, { SelectOption } from "../../atoms/Select/Select";
import Input from "../../atoms/Input/Input";
import Checkbox from "../../atoms/Checkbox/Checkbox";

interface FormFieldProps {
  label: string;
  id: string;
  options?: SelectOption[] | string[];
  placeholder?: string;
  type?:
    | "select"
    | "text"
    | "password"
    | "checkbox"
    | "number"
    | "datetime-local"
    | "radio"
    | "date"
    | "textarea"
    | "file";
  name?: string;
  className?: string;
  labelClassName?: string;
  maxDate?: string;
  searchable?: boolean;
  multiselect?: boolean;
  required?: boolean;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  options,
  placeholder,
  type = "text",
  name = "",
  labelClassName,
  searchable,
  maxDate,
  multiselect = false,
  required = true,
  onChange,
  disabled,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // Call the onChange function with the correct event type
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={`w-full ${type === "checkbox" ? "flex items-center" : ""}`}>
      {type === "checkbox" ? (
        <>
          <Checkbox
            id={id}
            name={name}
            onChange={handleChange}
            disabled={disabled}
          />
          <Label
            text={label}
            htmlFor={id}
            className={labelClassName}
            disabled={disabled}
          />
        </>
      ) : type === "radio" ? (
        <div className="flex flex-col">
          <Label
            text={label}
            htmlFor={id}
            className={labelClassName}
            disabled={disabled}
          />
          <div className="flex flex-row mt-2">
            {options?.map((option, index) => (
              <div className="form-check me-4" key={index}>
                <input
                  className="form-check-input mr-2"
                  type="radio"
                  name={name}
                  id={`${id}${index}`}
                  required={required}
                  value={option.toString()}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Label
                  text={typeof option === "string" ? option : ""}
                  htmlFor={`${id}${index}`}
                  className="form-check-label"
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </div>
      ) : type === "textarea" ? (
        <>
          <Label
            text={label}
            htmlFor={id}
            className={labelClassName}
            disabled={disabled}
          />
          <textarea
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={handleChange}
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <Label
            text={label}
            htmlFor={id}
            className={labelClassName}
            disabled={disabled}
          />
          {type === "select" ? (
            <Select
              id={id}
              name={name}
              options={options || []}
              placeholder={placeholder || ""}
              searchable={searchable}
              multiselect={multiselect}
              required={required}
              onChange={handleChange}
              disabled={disabled}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm mt-2"
            />
          ) : (
            <Input
              id={id}
              name={name}
              placeholder={placeholder || ""}
              type={type}
              {...(type === "date" ? { max: maxDate } : {})}
              {...(type === "file" ? { accept: "image/*" } : {})}
              required={required}
              disabled={disabled}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm mt-2"
            />
          )}
        </>
      )}
    </div>
  );
};

export default FormField;
