import LoginForm from "../components/organism/LoginForm/LoginForm";
import SignUpImage from "../components/organism/ImageCarousel/ImageCarousel";

export default function Page() {
  return (
    <main>
      <section className="bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="w-full flex flex-col items-center md:items-start mb-2 md:mb-0">
            <SignUpImage />
          </div>

          <div className="w-full p-6">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
