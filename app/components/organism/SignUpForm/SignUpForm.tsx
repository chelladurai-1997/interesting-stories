import Link from "next/link";
import FormField from "../../molecules/FormField/FormField";

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
        <FormField
          id="name"
          name="name"
          placeholder="Enter your full name"
          label="Name:"
          type="text"
          labelClassName="block text-gray-700"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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

export default SignUpForm;
