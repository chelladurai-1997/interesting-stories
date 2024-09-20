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
  searchable?: Boolean;
  multiselect?: Boolean;
  required?: Boolean;
  disabled?: boolean;
  onChange?: () => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder,
  className,
  searchable = false,
  required = false,
  disabled = false,
  onChange,
}) => (
  <>
    {searchable ? (
      <>
        <input
          id={id + "_search_input"}
          name={name}
          className={
            "w-full mt-1 p-2 border border-gray-300 rounded" + className
          }
          placeholder={placeholder}
          required
          list={name}
          type="search"
          onChange={onChange}
          disabled={disabled}
        />

        <datalist id={name}>
          {options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "string" ? option : option.value}
            />
          ))}
        </datalist>
      </>
    ) : (
      <select
        id={id}
        name={name}
        className={"w-full mt-1 p-2 border border-gray-300 rounded" + className}
        defaultValue=""
        required={typeof required === "boolean" ? required : false}
        onChange={onChange}
        disabled={disabled}
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
    )}
  </>
);

export default Select;
