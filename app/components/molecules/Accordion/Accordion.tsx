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
        className={`flex justify-between w-full p-4 font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-gray-500 transition-colors duration-300 ${
          isOpen
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-200 text-gray-800"
        }`}
      >
        <span className="text-lg text-cool-gray-500">{title}</span>
        {isOpen ? <UpIcon /> : <DownIcon />}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] py-4" : "max-h-0 p-0"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};
