"use client";
import Link from "next/link";
import FormField from "../../molecules/FormField/FormField";
import Container from "../../molecules/Container/Container";
import { useSignUpForm } from "@/app/lib/hooks/useSignUpForm";
import Button from "../../atoms/Button/Button";
import TermsConditionsPopup from "../../molecules/TermsConditionsPopup/TermsConditionsPopup";

const SignUpForm = () => {
  const {
    onSubmit,
    isRunning,
    setIsTermsPopupOpen,
    isTermsPopupOpen,
    isTermsAccepted,
    setIsTermsAccepted,
  } = useSignUpForm();

  return (
    <Container>
      <div className="form-tit">
        <h4 className="text-lg font-semibold">Try for Free</h4>
        <h1 className="text-2xl font-bold">Start Your Journey</h1>
        <p className="text-sm mt-2">
          Already signed up?{" "}
          <Link href="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>

        <form className="space-y-4" action={onSubmit} autoComplete="off">
          <FormField
            id="name"
            name="name"
            placeholder="Enter your full name"
            label="Name:"
            type="text"
            labelClassName="block text-gray-700"
          />

          <FormField
            label="Mobile no:"
            labelClassName="block text-gray-700"
            id="mobileNo"
            name="mobileNo"
            placeholder="Enter mobile number"
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />

          <FormField
            label="Password:"
            labelClassName="block text-gray-700"
            id="password"
            name="password"
            placeholder="Enter password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />

          <div className="form-group flex items-center">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              required
              checked={isTermsAccepted}
              onClick={(e) => setIsTermsAccepted(e?.currentTarget.checked)}
            />
            <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
              I agree to the{" "}
              <button
                className="text-yellow-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setIsTermsPopupOpen(true);
                }}
                type="button"
              >
                Terms and Conditions
              </button>
              .
            </label>
          </div>

          <Button text="Create Account" isPending={isRunning} />
          <p className="mt-4 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:underline"
              style={{
                color: "#202124",
                textDecoration: "underline",
                textDecorationColor: "#5e5e5e",
              }}
            >
              Skip and Browse Profiles
            </Link>
          </p>

          <TermsConditionsPopup
            isOpen={isTermsPopupOpen}
            onClose={() => {
              setIsTermsPopupOpen(false);
              setIsTermsAccepted(true);
            }}
          />
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
