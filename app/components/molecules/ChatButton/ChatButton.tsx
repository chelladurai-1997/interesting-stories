import { ChatIcon } from "../../icons/ChatIcon";

export const ChatButton: React.FC<{
  onClick: () => void;
  animate: boolean;
}> = ({ onClick, animate }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center text-white bg-gray-600 rounded-full w-14 h-14 hover:bg-gray-700 focus:ring-4 ${
      animate ? "ring-4 ring-gray-300 outline-none" : ""
    } focus:ring-gray-300 focus:outline-none transition-all duration-300`}
  >
    <ChatIcon />
  </button>
);
