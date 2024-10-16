// import { ChatIcon } from "../../icons/ChatIcon";

// interface ChatButtonProps {
//   onClick: () => void;
//   icon?: React.ReactNode; // Allow passing a different icon if needed
//   bgColor?: string; // Customize background color if needed
// }

// export const ChatButton: React.FC<ChatButtonProps> = ({
//   onClick,
//   icon = <ChatIcon />, // Default to ChatIcon
//   bgColor = "bg-gray-600", // Default background color
// }) => (
//   <button
//     title="Messages"
//     type="button"
//     onClick={onClick}
//     className={`flex md:px-2 text-sm transition-all duration-300`}
//   >
//     <span className="sr-only">View messages</span>
//     <div
//       className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}
//     >
//       {icon}
//     </div>
//   </button>
// );

interface IconButtonProps {
  onClick: () => void;
  animate?: boolean;
  icon?: React.ReactNode; // Allow passing any icon
  bgColor?: string; // Customize background color if needed
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  animate = false,
  icon,
  bgColor = "bg-gray-600",
}) => (
  <button
    title="Button"
    type="button"
    onClick={onClick}
    className={`flex md:px-2 text-sm transition-all duration-300 ${
      animate ? "animate-bounce" : ""
    }`}
  >
    <span className="sr-only">Button</span>
    <div
      className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}
    >
      {icon}
    </div>
  </button>
);
