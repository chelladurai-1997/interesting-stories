import { ChatIcon } from "../../icons/ChatIcon";

export const ChatButton: React.FC<{
  onClick: () => void;
  animate: boolean;
}> = ({ onClick, animate }) => (
  <button
    title="Messages"
    type="button"
    onClick={onClick}
    className={`flex  md:px-2 text-sm transition-all duration-300 ${
      animate ? "" : ""
    }`}
  >
    <span className="sr-only">View messages</span>
    <div
      className={`w-8 h-8 rounded-full bg-gray-600  flex items-center justify-center `}
    >
      <svg
        className="w-4 h-4 text-white" // Reduced size here
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    </div>
  </button>
);
