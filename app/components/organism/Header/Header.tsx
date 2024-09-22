"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/app/lib/contexts/UserContext";
import SearchForm from "../SearchForm/SearchForm";

interface HeaderProps {
  showSearchForm?: boolean;
  profileUpdateMode?: boolean;
  title?: string;
  highlightedText?: string;
}

const Header: React.FC<HeaderProps> = ({ showSearchForm }) => {
  const { userProfile, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
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
          <Link href="/" className="flex flex-col items-start">
            <span className="text-2xl font-semibold text-[#ffd700]">
              Linking Hearts
            </span>
            <span className="text-sm text-[#fa8072]">
              Bringing Families Together
            </span>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userProfile ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
                  id="user-menu-button"
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
                    <ul className="py-2" aria-labelledby="user-menu-button">
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
                          onClick={() => logout()}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
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
            )}

            <button
              data-collapse-toggle="navbar-user"
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
          </div>

          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg md:hidden min-w-48`} // Set min width here
            ref={mobileMenuRef}
          >
            <ul className="flex flex-col font-medium p-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:bg-gray-600 rounded"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:bg-gray-600 rounded"
                  aria-current="page"
                >
                  Services
                </a>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="block py-2 px-3 text-white hover:bg-gray-600 rounded"
                >
                  Register
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:bg-gray-600 rounded"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div
            className="hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 bg-gray-900 border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:text-[#ffd700] rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:text-[#ffd700] rounded md:bg-transparent md:p-0"
                >
                  Browse Profiles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:text-[#ffd700] rounded md:bg-transparent md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:text-[#ffd700] rounded md:bg-transparent md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showSearchForm && <SearchForm />}
    </section>
  );
};

export default Header;
