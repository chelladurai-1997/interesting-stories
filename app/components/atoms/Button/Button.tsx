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
    className="w-full bg-yellow-500 text-white p-2 rounded-lg shadow-md flex items-center justify-center hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  >
    {isPending ? (
      <div className="flex items-center">
        <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

        <span className="ml-2">Working...</span>
      </div>
    ) : (
      <>
        {text}
        {icon && <span className="ml-4">{icon}</span>}
      </>
    )}
  </button>
);

export default Button;
