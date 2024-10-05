import { DownIcon } from "../../icons/DownIcon";
import { UpIcon } from "../../icons/UpIcon";

export const Accordion: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onClick}
        className={`flex justify-between w-full p-4 font-medium text-left text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 ${
          isOpen ? "bg-gray-200" : "hover:bg-gray-200"
        }`}
      >
        {title}
        {isOpen ? <UpIcon /> : <DownIcon />}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        {isOpen && children}
      </div>
    </div>
  );
};
