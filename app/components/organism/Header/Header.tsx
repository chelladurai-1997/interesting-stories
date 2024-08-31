import Paragraph from "../../atoms/Paragraph/Paragraph";
import Title from "../../atoms/Title/Title";
import SearchForm from "../SearchForm/SearchForm";

interface HeaderProps {
  showSearchForm?: boolean;
}
const Header: React.FC<HeaderProps> = ({ showSearchForm }) => (
  <section>
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-yellow-300">
            <i className="font-bold text-lg">#1</i> Matrimony
          </div>
          <Title text="Sign In" highlightedText="Right Away" />
          <Paragraph text="Most trusted Kongu Vellalar Gounder's Matrimony" />
        </div>
      </div>
      {showSearchForm && <SearchForm />}
    </div>
  </section>
);

export default Header;
