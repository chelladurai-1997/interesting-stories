import { onSignUpFormSubmit } from "@/app/lib/actions/signup.action";
import SignUpForm from "../components/organism/SignUpForm/SignUpForm";
import SignUpHeader from "../components/organism/SignUpHeader/SignUpHeader";
import SignUpImage from "../components/organism/SignUpImage/SignUpImage";

export default function Page() {
  return (
    <main>
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-6">
            <SignUpHeader />
            <SignUpImage />
          </div>

          <div className="w-full md:w-1/2 p-6">
            <SignUpForm onSignUpFormSubmit={onSignUpFormSubmit} />
          </div>
        </div>
      </section>
    </main>
  );
}
