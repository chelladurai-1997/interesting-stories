type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode; // Optional prop for the icon
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "submit",
  icon,
}) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-yellow-500 text-white p-2 rounded-lg shadow-md flex items-center justify-center hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  >
    {text}
    {icon && <span className="ml-4">{icon}</span>}
    {/* Render the icon if provided */}
  </button>
);

export default Button;
