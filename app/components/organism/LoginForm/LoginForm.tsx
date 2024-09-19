"use client";
import Link from "next/link";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import { useLoginForm } from "@/app/lib/hooks/useLoginForm";
import Container from "../../molecules/Container/Container";

const LoginForm: React.FC = () => {
  const { isRunning, onSubmit } = useLoginForm();

  return (
    <Container>
      <div className="form-tit">
        <h4 className="text-lg font-semibold">Welcome Back</h4>
        <h1 className="text-2xl font-bold">Sign In to Your Account</h1>
        <p className="text-sm mt-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-yellow-500 hover:underline">
            Sign Up
          </Link>
        </p>

        <form className="space-y-4" action={onSubmit} autoComplete="off">
          <FormField
            id="mobileNo"
            name="mobileNo"
            placeholder="Enter your mobile number"
            label="Mobile no:"
            type="text"
            labelClassName="block text-gray-700"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />

          <FormField
            label="Password:"
            id="password"
            name="password"
            placeholder="Enter password"
            type="password"
            labelClassName="block text-gray-700"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="form-check-input h-4 w-4 border-gray-300 rounded text-yellow-600 focus:ring-yellow-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <Button text="Login" isPending={isRunning} />

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
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
