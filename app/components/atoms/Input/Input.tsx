type InputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
  className?: string;
  max?: string;
  accept?: string;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  name,
  placeholder,
  type,
  required,
  className = "",
  max,
  accept,
  disabled,
}) => (
  <input
    id={id}
    name={name}
    placeholder={placeholder}
    required={required}
    type={type}
    max={max}
    className={
      "mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 p-2 sm:text-sm " +
      className
    }
    autoComplete="off"
    accept={accept}
    disabled={disabled}
  />
);

export default Input;
