import React from "react";
import Label from "../../atoms/Label/Label";
import Select, { SelectOption } from "../../atoms/Select/Select";
import Input from "../../atoms/Input/Input";
import Checkbox from "../../atoms/Checkbox/Checkbox";

interface FormFieldProps {
  label: string;
  id: string;
  options?: SelectOption[] | string[]; // Make options optional
  placeholder?: string;
  type?: "select" | "text" | "password" | "checkbox" | "number"; // Allow different input types
  name?: string; // Add name prop for input/checkbox
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
    ) : (
      <>
        <Label text={label} htmlFor={id} className={labelClassName} />
        {type === "select" ? (
          <Select
            id={id}
            options={options || []}
            placeholder={placeholder || ""}
            className={className}
          />
        ) : (
          <Input
            id={id}
            name={name}
            placeholder={placeholder || ""}
            type={type}
            className={className}
          />
        )}
      </>
    )}
  </div>
);

export default FormField;
