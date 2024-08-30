import React from "react";

const PersonalInfoStepper = () => {
  return (
    <main>
      <Header />
      <PersonalDetailsForm />
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
          <h1 className="text-4xl font-bold text-white">Personal Details</h1>
          <p className="text-white mt-4">
            Fill out your details to complete the registration
          </p>
        </div>
      </div>
    </div>
  </section>
);

const PersonalDetailsForm = () => {
  // Define the options for gender in a variable
  const genderOptions = [
    { value: "", label: "Select Gender", disabled: true },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <section className="bg-white p-6 mt-10 rounded-lg shadow-lg">
      <div className="container mx-auto">
        <form className="max-w-md mx-auto space-y-6">
          <div className="form-tit text-center mb-6 space-y-3">
            <h4 className="text-lg font-semibold">Complete Your Profile</h4>
            <h1 className="text-2xl font-bold">Personal Details</h1>
            <p className="text-sm">
              Please fill in your details below to complete your profile.
            </p>
          </div>
          <div className="form-details">
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="fullName" className="block text-gray-700">
                  Full Name:
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="block text-gray-700">
                  Date of Birth:
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="block text-gray-700">
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                >
                  {genderOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="address" className="block text-gray-700">
                  Address:
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Address"
                  rows="4"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Save Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PersonalInfoStepper;
