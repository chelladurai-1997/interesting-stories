type InputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  name,
  placeholder,
  type,
  required = true,
  className,
}) => (
  <input
    id={id}
    name={name}
    placeholder={placeholder}
    required={required}
    type={type}
    className={
      "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" +
      className
    }
  />
);

export default Input;
