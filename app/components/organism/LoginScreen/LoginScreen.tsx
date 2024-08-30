import React from "react";

const LoginScreen = () => {
  return (
    <main>
      <Header />
      <LoginForm />
    </main>
  );
};

const Header = () => (
  <section>
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-yellow-300">
            <i className="font-bold text-lg">#1</i> Matrimony
          </div>
          <h1 className="text-4xl font-bold text-white">
            Sign In to <br />
            <b className="text-yellow-300">Right Away</b>
          </h1>
          <p className="text-white mt-4">
            Most trusted Kongu Vellalar Gounder's Matrimony
          </p>
        </div>
      </div>
    </div>
  </section>
);

const LoginForm = () => (
  <section className="bg-white p-6 mt-10 rounded-lg shadow-lg">
    <div className="container mx-auto">
      <form className="max-w-md mx-auto space-y-6">
        <div className="form-tit text-center mb-6 space-y-3">
          <h4 className="text-lg font-semibold">Never miss the update</h4>
          <h1 className="text-2xl font-bold">Sign in to MeetYourSoul</h1>
          <p className="text-sm">
            Don't have an account?{" "}
            <a className="text-yellow-500 hover:underline">Register</a>
          </p>
        </div>
        <div className="form-login">
          <form className="space-y-4">
            <div className="form-group">
              <label htmlFor="mobileNo" className="block text-gray-700">
                Mobile no:
              </label>
              <input
                id="mobileNo"
                name="mobileNo"
                placeholder="Mobile No"
                required
                type="text"
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
                className="form-check-input"
              />
              <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Login
            </button>
          </form>
        </div>
      </form>
    </div>
  </section>
);

export default LoginScreen;
