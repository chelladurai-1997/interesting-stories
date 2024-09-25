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
  searchable?: boolean; // Changed from Boolean to boolean
  multiselect?: boolean; // Changed from Boolean to boolean
  required?: boolean; // Changed from Boolean to boolean
  disabled?: boolean;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder,
  className = "",
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
            "w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 " +
            className
          }
          placeholder={placeholder}
          required={required}
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
        className={
          "w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 " +
          className
        }
        defaultValue=""
        required={required}
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
