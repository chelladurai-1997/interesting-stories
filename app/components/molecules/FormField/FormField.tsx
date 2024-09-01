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
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  options,
  placeholder,
  type = "text",
  name = "",
  labelClassName,
  className,
}) => (
  <div className={`w-full ${type === "checkbox" ? "flex items-center" : ""}`}>
    {type === "checkbox" ? (
      <>
        <Checkbox id={id} name={name} />
        <Label text={label} htmlFor={id} className={labelClassName} />
      </>
    ) : type === "radio" ? (
      <div className="flex flex-col">
        <Label text={label} htmlFor={id} className={labelClassName} />
        <div className="flex flex-row mt-2">
          {options?.map((option: unknown, index: number) => {
            return (
              <div className="form-check me-4">
                <input
                  className="form-check-input mr-2"
                  type="radio"
                  name={name}
                  id={`${id}${index}`}
                  required
                  value="living"
                />

                <Label
                  text={typeof option === "string" ? option : ""}
                  htmlFor={id}
                  className="form-check-label"
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : type === "textarea" ? (
      <>
        <Label text={label} htmlFor={id} className={labelClassName} />
        <textarea
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          id="profile_bio"
          name="profile_bio"
          placeholder="Profile biography"
          required
        />
      </>
    ) : (
      <>
        <Label text={label} htmlFor={id} className={labelClassName} />
        {type === "select" ? (
          <Select
            id={id}
            options={options || []}
            placeholder={placeholder || ""}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        ) : (
          <Input
            id={id}
            name={name}
            placeholder={placeholder || ""}
            type={type}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        )}
      </>
    )}
  </div>
);

export default FormField;
