type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode; // Optional prop for the icon
  isPending?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "submit",
  icon,
  isPending = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isPending}
    className={`w-full bg-yellow-500 text-white font-semibold py-3 rounded-md shadow-md flex items-center justify-center transition duration-200 
      ${
        isPending
          ? "cursor-not-allowed bg-gray-400"
          : "hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
      }`}
  >
    {isPending ? (
      <div className="flex items-center">
        <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <span className="ml-2">Working...</span>
      </div>
    ) : (
      <>
        {text}
        {icon && <span className="ml-2">{icon}</span>}
      </>
    )}
  </button>
);

export default Button;
