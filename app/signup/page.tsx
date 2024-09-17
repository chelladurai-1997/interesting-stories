import SignUpForm from "../components/organism/SignUpForm/SignUpForm";
import ImageCarousel from "../components/organism/ImageCarousel/ImageCarousel";

export default function Page() {
  return (
    <main>
      <section className="bg-gray-50  mb-10 md:mb-0">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="w-full flex flex-col items-center md:items-start mb-2 md:mb-0">
            <ImageCarousel />
          </div>

          <div className="w-full px-6 lg:p-6">
            <SignUpForm />
          </div>
        </div>
      </section>
    </main>
  );
}
