import React from "react";

interface SidebarItemProps {
  href: string;
  icon: string;
  text: string;
  isActive?: boolean;
  external?: boolean;
  button?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  text,
  isActive,
  external,
  button,
}) => (
  <li
    className={`hover:bg-blue-50 ${isActive ? "bg-blue-100" : ""} ${
      button ? "cursor-pointer" : ""
    }`}
  >
    {button ? (
      <button className="w-full text-left px-4 py-2 flex items-center text-gray-700">
        <i className={`fa ${icon} mr-3`} aria-hidden="true"></i>
        {text}
      </button>
    ) : (
      <a
        href={href}
        className="w-full  px-4 py-2 flex items-center text-gray-700"
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : ""}
      >
        <i className={`fa ${icon} mr-3`} aria-hidden="true"></i>
        {text}
      </a>
    )}
  </li>
);

const Sidebar: React.FC = () => {
  return <aside className="w-64 h-screen bg-gray-100 shadow-lg"></aside>;
};

export default Sidebar;
