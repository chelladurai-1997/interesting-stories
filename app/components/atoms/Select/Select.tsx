export interface SelectOption {
  value: string;
  label?: string;
}
export interface SelectProps {
  id: string;
  name: string;
  options: SelectOption[] | string[];
  placeholder: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder,
  className,
}) => (
  <select
    id={id}
    name={name}
    className={"w-full mt-2 p-2 border border-gray-300 rounded" + className}
    defaultValue=""
    required
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((option, index) => (
      <option
        key={index}
        value={typeof option === "string" ? option : option.value}
      >
        {typeof option === "string" ? option : option.label || option.value}
      </option>
    ))}
  </select>
);

export default Select;
