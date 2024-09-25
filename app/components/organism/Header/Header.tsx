"use client";
import Link from "next/link";
import { useEffect, useRef, useState, FC } from "react";
import { useUser } from "@/app/lib/contexts/UserContext";
import SearchForm from "../SearchForm/SearchForm";

interface HeaderProps {
  showSearchForm?: boolean;
  profileUpdateMode?: boolean;
  title?: string;
  highlightedText?: string;
}

const Header: FC<HeaderProps> = ({ showSearchForm }) => {
  const { userProfile, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative bg-gray-900 pb-4">
      <nav className="border-gray-200 bg-gray-900 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Brand />
          <UserControls
            userProfile={userProfile}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            logout={logout}
            dropdownRef={dropdownRef}
            mobileMenuRef={mobileMenuRef}
          />
          <NavMenu isMobileMenuOpen={isMobileMenuOpen} />
        </div>
      </nav>
      {showSearchForm && <SearchForm />}
    </section>
  );
};

const Brand = () => (
  <Link href="/" className="flex flex-col items-start">
    <span className="text-2xl font-semibold text-[#ffd700]">
      Linking Hearts
    </span>
    <span className="text-sm text-[#fa8072]">Bringing Families Together</span>
  </Link>
);

interface UserControlsProps {
  userProfile: any;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  logout: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
}

const UserControls: FC<UserControlsProps> = ({
  userProfile,
  isDropdownOpen,
  toggleDropdown,
  isMobileMenuOpen,
  toggleMobileMenu,
  logout,
  dropdownRef,
}) => (
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    {/* <NotificationBell /> */}
    {userProfile ? (
      <UserDropdown
        userProfile={userProfile}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        logout={logout}
        dropdownRef={dropdownRef}
      />
    ) : (
      <AuthButtons />
    )}
    <MobileMenuToggle
      isMobileMenuOpen={isMobileMenuOpen}
      toggleMobileMenu={toggleMobileMenu}
    />
  </div>
);

const AuthButtons = () => (
  <div className="flex space-x-2">
    <Link href="/login">
      <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-300">
        Login
      </button>
    </Link>
    <Link href="/signup" className="hidden md:block">
      <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-300">
        Register
      </button>
    </Link>
  </div>
);

interface UserDropdownProps {
  userProfile: any;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  logout: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const UserDropdown: FC<UserDropdownProps> = ({
  userProfile,
  isDropdownOpen,
  toggleDropdown,
  logout,
  dropdownRef,
}) => (
  <div className="relative" ref={dropdownRef}>
    <button
      type="button"
      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
      aria-expanded={isDropdownOpen}
      onClick={toggleDropdown}
    >
      <span className="sr-only">Open user menu</span>
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
        <span className="text-white text-xs">
          {userProfile.userName?.at(0)}
        </span>
      </div>
    </button>

    {isDropdownOpen && (
      <div className="absolute right-0 my-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <div className="px-4 py-3">
          <span className="block text-sm text-white">
            {userProfile?.userName}
          </span>
          <span className="block text-sm truncate text-gray-400">
            {userProfile.userId}
          </span>
        </div>
        <ul className="py-2">
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              aria-disabled
              href="#"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
              onClick={logout}
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
);

interface MobileMenuToggleProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenuToggle: FC<MobileMenuToggleProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => (
  <button
    type="button"
    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
    aria-controls="navbar-user"
    aria-expanded={isMobileMenuOpen ? "true" : "false"}
    onClick={toggleMobileMenu}
  >
    <span className="sr-only">Open main menu</span>
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 17 14"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1 1h15M1 7h15M1 13h15"
      />
    </svg>
  </button>
);

interface NavMenuProps {
  isMobileMenuOpen: boolean;
}
const NavMenu: FC<NavMenuProps> = ({ isMobileMenuOpen }) => (
  <div
    className={`absolute top-full left-0 right-0 z-10 md:flex md:w-auto md:order-1 ${
      isMobileMenuOpen ? "block" : "hidden"
    }`}
  >
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900 bg-gray-800 border-gray-700">
      <li>
        <Link
          href="/"
          className="block py-2 pl-3 pr-4 text-white md:p-0"
          aria-current="page"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/services"
          className="block py-2 pl-3 pr-4 text-white md:p-0"
        >
          Services
        </Link>
      </li>
      <li>
        <Link href="/about" className="block py-2 pl-3 pr-4 text-white md:p-0">
          About Us
        </Link>
      </li>
      <li>
        <Link href="/links" className="block py-2 pl-3 pr-4 text-white md:p-0">
          Links
        </Link>
      </li>
    </ul>
  </div>
);

export default Header;
