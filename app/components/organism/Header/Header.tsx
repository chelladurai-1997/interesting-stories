"use client";
import Link from "next/link";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Title from "../../atoms/Title/Title";
import SearchForm from "../SearchForm/SearchForm";
import { useUser } from "@/app/lib/contexts/UserContext";

interface HeaderProps {
  showSearchForm?: boolean;
  profileUpdateMode?: boolean;
  title?: string;
  highlightedText?: string;
}

const Header: React.FC<HeaderProps> = ({ showSearchForm }) => {
  const { userProfile, logout } = useUser();

  return (
    <section className="relative">
      <div className="bg-gray-800 p-4 relative">
        <div className="container mx-auto">
          <div className="pl-4 text-center">
            <Title text="" highlightedText="Linking Hearts" />
            <Paragraph text="Uniting Kongu Families" />
          </div>
        </div>

        {showSearchForm && <SearchForm />}
      </div>
      {/* Center links on mobile, align right on larger screens */}
      <div className="absolute top-0 left-0 right-0 mt-4 flex justify-center sm:justify-end space-x-4 px-6">
        <Link href="/" className="text-white hover:underline" aria-label="Home">
          Home
        </Link>
        <Link
          href="/about"
          className="text-white hover:underline"
          aria-label="About us"
        >
          About us
        </Link>

        {/* Check if the user is logged in or not */}
        {userProfile ? (
          <>
            <button
              onClick={logout}
              className="text-white hover:underline"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-white hover:underline"
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-white hover:underline"
              aria-label="Register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Header;
