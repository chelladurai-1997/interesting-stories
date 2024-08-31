import Link from "next/link";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Title from "../../atoms/Title/Title";
import SearchForm from "../SearchForm/SearchForm";

interface HeaderProps {
  showSearchForm?: boolean;
  profileUpdateMode?: boolean;
  title?: string;
  highlightedText?: string;
}

const Header: React.FC<HeaderProps> = ({
  showSearchForm,
  profileUpdateMode,
  title,
  highlightedText,
}) => (
  <section className="relative">
    <div className="bg-gray-800 py-10 relative">
      {profileUpdateMode ? (
        <>
          <div className="text-center">
            <Title
              text={highlightedText || ""}
              highlightedText={""}
              level={1}
            />
            <Paragraph text={title || ""} />
          </div>
        </>
      ) : (
        <div className="container mx-auto">
          <div className="text-center">
            <Title
              text="🌟"
              highlightedText=" Welcome to the Next Chapter of Your Love Story 💖"
            />
            <Paragraph text="Most trusted Kongu Vellalar Gounder's Matrimony" />
          </div>
        </div>
      )}
      {showSearchForm && <SearchForm />}
    </div>
    <div className="absolute top-0 right-0 mt-4 mr-6 flex space-x-4">
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
    </div>
  </section>
);

export default Header;
