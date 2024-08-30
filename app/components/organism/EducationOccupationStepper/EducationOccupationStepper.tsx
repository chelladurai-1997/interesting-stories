import React from "react";

// Dropdown options
const EDUCATION_OPTIONS = [
  "Select Education",
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

const OCCUPATION_OPTIONS = [
  "Select Occupation",
  "Engineer",
  "Doctor",
  "Teacher",
  "Manager",
  "Others",
];

const MONTHLY_INCOME_OPTIONS = [
  "Select Monthly Income",
  "Below 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 1,00,000",
  "Above 1,00,000",
];

const EducationOccupationScreen = () => {
  return (
    <main>
      <Header />
      <EducationOccupationForm />
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
            Education &amp; Occupation Details
          </h1>
          <p className="text-white mt-4">
            Please provide your details accurately.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const EducationOccupationForm = () => (
  <section className="bg-white p-6 mt-10 rounded-lg shadow-lg">
    <div className="container mx-auto">
      <form className="space-y-6">
        <div className="text-center mb-6 space-y-3">
          <h4 className="text-lg font-semibold">Step 3 of 7</h4>
          <h1 className="text-2xl font-bold">Education & Occupation</h1>
          <p className="text-sm">We won't share it unnecessarily!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="education" className="block text-gray-700">
              Education (கல்வி): <span className="text-red-500">*</span>
            </label>
            <select
              id="education"
              name="education"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              {EDUCATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="educationInfo" className="block text-gray-700">
              Education Information (கல்வி விபரம்):{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="educationInfo"
              name="educationInfo"
              placeholder="Education Information"
              required
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="occupation" className="block text-gray-700">
              Occupation (தொழில்): <span className="text-red-500">*</span>
            </label>
            <select
              id="occupation"
              name="occupation"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              {OCCUPATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="occupationInfo" className="block text-gray-700">
              Occupation Information (தொழில் விபரம்):{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="occupationInfo"
              name="occupationInfo"
              placeholder="Occupation Information"
              required
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="workingPlace" className="block text-gray-700">
              Working Place (பணிபுரியுமிடம்):{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="workingPlace"
              name="workingPlace"
              placeholder="Working Place"
              required
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="monthlyIncome" className="block text-gray-700">
              Monthly Income (மாத வருமானம்):{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="monthlyIncome"
              name="monthlyIncome"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              {MONTHLY_INCOME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <a className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-400">
            Back
          </a>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Save & Proceed
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="inline-block ml-2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </section>
);

export default EducationOccupationScreen;
