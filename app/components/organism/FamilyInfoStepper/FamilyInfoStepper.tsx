import React from "react";

// Dropdown options
const dropdownOptions = {
  jaadhagamOptions: ["Option 1", "Option 2", "Option 3"],
  expectingStarsOptions: ["Option 1", "Option 2", "Option 3"],
};

const FamilyInfoStepper = () => {
  // Function to handle back navigation
  const handleBack = () => {};

  return (
    <main>
      <Header />
      <ExpectationForm onBack={handleBack} />
    </main>
  );
};

const Header = () => (
  <section>
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-yellow-300">
            <i className="font-bold text-lg">Step 6 of 7</i>
          </div>
          <h1 className="text-4xl font-bold text-white">Expectation</h1>
          <p className="text-white mt-4">Profile Expectation!</p>
        </div>
      </div>
    </div>
  </section>
);

const ExpectationForm = ({ onBack }) => (
  <section className="bg-white p-6 mt-10 rounded-lg shadow-lg">
    <div className="container mx-auto">
      <form className="space-y-6">
        {/* Back Button */}
        <div className="text-left mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Jaadhagam */}
        <div className="form-group mb-6">
          <label htmlFor="jaadhagam" className="block text-gray-700">
            Jaadhagam (ஜாதகம்): <span className="text-red-500">*</span>
          </label>
          <select
            id="jaadhagam"
            name="jaadhagam"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Jaadhagam
            </option>
            {dropdownOptions.jaadhagamOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div className="form-group mb-6">
          <label htmlFor="marital_status" className="block text-gray-700">
            Marital Status (திருமண நிலை):{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="marital_status"
            name="marital_status"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Marital Status
            </option>
            <option value="single">Single - (திருமணம் ஆகாதவர்)</option>
            <option value="married">Married - (திருமணமானவர்)</option>
            <option value="divorced">Divorced - (விவாகரத்து ஆனவர்)</option>
            <option value="widowed">Widowed - (துணையை இழந்தவர்)</option>
          </select>
        </div>

        {/* Working Place */}
        <div className="form-group mb-6">
          <label htmlFor="working_place" className="block text-gray-700">
            Working Place (பணியிடம்): <span className="text-red-500">*</span>
          </label>
          <select
            id="working_place"
            name="working_place"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Working Place
            </option>
            <option value="Tamil nadu - தமிழ்நாடு">
              Tamil Nadu - தமிழ்நாடு
            </option>
            <option value="Other state - வெளிமாநிலம்">
              Other State - வெளிமாநிலம்
            </option>
            <option value="Other country - வெளிநாடு">
              Other Country - வெளிநாடு
            </option>
            <option value="Tamil nadu agreed - தமிழ்நாடு சம்மதம்">
              Tamil Nadu Agreed - தமிழ்நாடு சம்மதம்
            </option>
            <option value="Other state agreed - வெளிமாநிலம் சம்மதம்">
              Other State Agreed - வெளிமாநிலம் சம்மதம்
            </option>
            <option value="Other country agreed - வெளிநாடு சம்மதம்">
              Other Country Agreed - வெளிநாடு சம்மதம்
            </option>
            <option value="No expectations - எதுவும் சம்மதம்">
              No Expectations - எதுவும் சம்மதம்
            </option>
          </select>
        </div>

        {/* Expecting Stars */}
        <div className="form-group mb-6">
          <label htmlFor="expecting_stars" className="block text-gray-700">
            Expecting Stars (பொருத்தம் நட்சத்திரம்):{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="expecting_stars"
            name="expecting_stars"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Matching Stars
            </option>
            {dropdownOptions.expectingStarsOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Expectation */}
        <div className="form-group mb-6">
          <label htmlFor="expectation_info" className="block text-gray-700">
            Expectation (எதிர்பார்ப்பு): <span className="text-red-500">*</span>
          </label>
          <textarea
            id="expectation_info"
            name="expectation_info"
            placeholder="Expectation"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg font-semibold"
          >
            Save & Proceed
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="ms-4 h-5 w-5"
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

export default FamilyInfoStepper;
