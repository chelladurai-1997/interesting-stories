import React from "react";
import Link from "next/link";

const SignUpScreen = () => {
  return (
    <main>
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-6">
            <SignUpHeader />
            <SignUpImage />
            <div className="hidden md:block bg-gray-200 h-48 w-full"></div>
          </div>

          <div className="w-full md:w-1/2 p-6">
            <SignUpForm />
          </div>
        </div>
      </section>
    </main>
  );
};

const SignUpHeader = () => (
  <div className="text-center md:text-left mb-6">
    <h2 className="text-3xl font-bold text-gray-800">
      Now <b className="text-yellow-500">Find your life partner</b> Easy and
      fast.
    </h2>
  </div>
);

const SignUpImage = () => (
  <div className="mb-6">
    <img
      src="/themes/images/login-couple.png"
      alt="Couple"
      className="w-full object-cover"
    />
  </div>
);

const SignUpForm = () => (
  <div className="form-tit mb-6">
    <h4 className="text-lg font-semibold">Start for free</h4>
    <h1 className="text-2xl font-bold">Sign up to MeetYourSoul</h1>
    <p className="text-sm mt-2">
      Already a member?{" "}
      <Link href="/login" className="text-yellow-500 hover:underline">
        Login
      </Link>
    </p>

    <div className="form-login bg-white p-6 rounded-lg shadow-lg">
      <form className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your full name"
            autoComplete="name"
            required
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo" className="block text-gray-700">
            Mobile no:
          </label>
          <input
            id="mobileNo"
            name="mobileNo"
            placeholder="Enter mobile number"
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            id="password"
            name="password"
            placeholder="Enter password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>
        <div className="form-group flex items-center">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            required
            className="form-check-input"
          />
          <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-yellow-500 hover:underline">
              Terms and Conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
);

export default SignUpScreen;
