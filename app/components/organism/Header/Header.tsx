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

const Header: React.FC<HeaderProps> = ({ showSearchForm }) => (
  <section className="relative">
    <div className="bg-gray-800 py-10 relative">
      <div className="container mx-auto">
        <div className="pl-4 md:text-center">
          <Title text="" highlightedText="KonguVengai.com" />
          <Paragraph text="The Most Trusted Matrimony for Kongu Vellalar Gounders" />
        </div>
      </div>

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
