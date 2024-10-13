import React from "react";
import Label from "../../atoms/Label/Label";
import Select, { SelectOption } from "../../atoms/Select/Select";
import Input from "../../atoms/Input/Input";
import Checkbox from "../../atoms/Checkbox/Checkbox";

export type InputPropEvent =
  | React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  | SelectOption[]
  | SelectOption
  | null;

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
  onChange?: (event: InputPropEvent) => void;
  disabled?: boolean;
  defaultValue?: string;
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
  defaultValue,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (onChange) {
      onChange(event);
    }
  };

  // Convert string[] to SelectOption[]
  const normalizedOptions: SelectOption[] | undefined = Array.isArray(options)
    ? typeof options[0] === "string"
      ? (options as string[]).map((opt) => ({
          value: opt,
          label: opt,
        }))
      : (options as SelectOption[])
    : undefined;

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
            {normalizedOptions?.map((option, index) => (
              <div className="form-check me-4" key={index}>
                <input
                  className="form-check-input mr-2"
                  type="radio"
                  name={name}
                  id={`${id}${index}`}
                  required={required}
                  value={option.value}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Label
                  text={option.label}
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
            className="mt-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 p-2 sm:text-sm"
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
              options={normalizedOptions}
              placeholder={placeholder || ""}
              isMulti={multiselect}
              required={required}
              onChange={onChange}
              isSearchable={searchable}
              defaultValue={defaultValue}
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
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 p-2 sm:text-sm mt-2"
            />
          )}
        </>
      )}
    </div>
  );
};

export default FormField;
