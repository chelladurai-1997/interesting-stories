import React from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

// Dropdown options
const dropdownOptions = {
  raasiOptions: ["Option 1", "Option 2", "Option 3"],
  nachathiramOptions: ["Option 1", "Option 2", "Option 3"],
  lagnamOptions: ["Option 1", "Option 2", "Option 3"],
  dhosamOptions: ["Option 1", "Option 2", "Option 3"],
};

const HoroscopeSection = () => {
  // Function to handle back navigation
  const handleBack = () => {
    // Logic to navigate back
    // window.history.back(); // Example for simple back navigation
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto max-w-3xl">
        <button
          type="button"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600 focus:outline-none mt-4"
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
        <HoroscopeForm />
      </div>
    </main>
  );
};

const Header = () => (
  <section>
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-yellow-300">
            <i className="font-bold text-lg">Step 5 of 7</i>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Horoscope Information
          </h1>
          <p className="text-white mt-4">Astrology, a divine power!</p>
        </div>
      </div>
    </div>
  </section>
);

const HoroscopeForm = () => (
  <section className="bg-white p-6 mt-10 rounded-lg shadow-lg">
    <form className="space-y-6">
      {/* Raasi */}
      <FormField
        label="Raasi (ராசி)"
        id="raasi"
        placeholder="Select Raasi"
        options={dropdownOptions.raasiOptions}
      />

      {/* Star */}
      <FormField
        label="Star (நட்சத்திரம்)"
        id="nachathiram"
        placeholder="Select Nachathiram"
        options={dropdownOptions.nachathiramOptions}
      />

      {/* Lagnam */}
      <FormField
        label="Lagnam (லக்னம்)"
        id="lagnam"
        placeholder="Select Lagnam"
        options={dropdownOptions.lagnamOptions}
      />

      {/* Dhisai Irupu */}
      <TextField
        label="Dhisai Irupu (திசை இருப்பு)"
        id="dhisai_irupu"
        placeholder="Dhisai Irupu"
      />

      {/* Jaadhagam Status */}
      <FormField
        label="Jaadhagam Status (ஜாதகத்தின் நிலை)"
        id="dhosam"
        placeholder="Select Dhosam"
        options={dropdownOptions.dhosamOptions}
      />

      {/* Upload Section */}
      <UploadField />

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          type="submit"
          className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Submit
        </button>
      </div>
    </form>
  </section>
);

// FormField Component
const FormField = ({ label, id, placeholder, options }: any) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      id={id}
      name={id}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option: any, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// TextField Component
const TextField = ({ label, id, placeholder }: any) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={id}
      name={id}
      placeholder={placeholder}
      type="text"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
    />
  </div>
);

// UploadField Component
const UploadField = () => (
  <div className="mb-6">
    <label htmlFor="upload" className="block text-gray-700">
      Upload Horoscope (ஜாதகம் பதிவேற்றம்)
    </label>
    <input
      id="upload"
      name="upload"
      type="file"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
    />
  </div>
);

export default HoroscopeSection;
