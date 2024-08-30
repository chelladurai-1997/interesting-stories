import React from "react";

// Placeholder options for dropdowns, update as needed
const dropdownOptions = {
  countries: ["Country 1", "Country 2", "Country 3"],
  states: ["State 1", "State 2", "State 3"],
  districts: ["District 1", "District 2", "District 3"],
};

const ContactInformationSection = () => {
  // Function to handle back navigation
  const handleBack = () => {};

  return (
    <main>
      <Header />
      <ContactInformationForm onBack={handleBack} />
    </main>
  );
};

const Header = () => (
  <section>
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-yellow-300">
            <i className="font-bold text-lg">Final Step</i>
          </div>
          <h1 className="text-4xl font-bold text-white">Contact Information</h1>
          <p className="text-white mt-4">
            That's the final information we need.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ContactInformationForm = ({ onBack }) => (
  <section className="bg-white p-6 mt-10 rounded-lg shadow-lg mx-auto max-w-4xl">
    <div className="container mx-auto">
      <form className="space-y-6">
        {/* Back Button */}
        <div className="text-left mb-6">
          <button
            type="button"
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

        {/* Mobile No */}
        <div className="form-group mb-6">
          <label htmlFor="mobile" className="block text-gray-700">
            Mobile no: (அலைபேசி எண்): <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Mobile number"
          />
        </div>

        {/* WhatsApp No */}
        <div className="form-group mb-6">
          <label htmlFor="whatsapp" className="block text-gray-700">
            Whatsapp No (வாட்ஸ்அப் எண்): <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mb-2">
            <input type="checkbox" id="sameAsMobile" className="mr-2" />
            <label htmlFor="sameAsMobile" className="text-sm text-gray-600">
              Same as Mobile
            </label>
          </div>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="WhatsApp No."
          />
        </div>

        {/* Country */}
        <div className="form-group mb-6">
          <label htmlFor="country" className="block text-gray-700">
            Country (நாடு): <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Country
            </option>
            {dropdownOptions.countries.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="form-group mb-6">
          <label htmlFor="state" className="block text-gray-700">
            State (மாநிலம்): <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select State
            </option>
            {dropdownOptions.states.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="form-group mb-6">
          <label htmlFor="district" className="block text-gray-700">
            District (மாவட்டம்): <span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            name="district"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select District
            </option>
            {dropdownOptions.districts.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="form-group mb-6">
          <label htmlFor="address" className="block text-gray-700">
            Permanent Address (முகவரி): <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Full Address"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            rows="2"
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group mb-6">
          <label htmlFor="photo" className="block text-gray-700">
            Photo (புகைப்படம்): <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*, application/pdf"
              required
              className="border border-gray-300 rounded-md p-2"
            />
            <small className="ml-4 text-xs text-gray-600">
              Uploading new photo will replace existing photo.
            </small>
          </div>
        </div>

        {/* Pincode */}
        <div className="form-group mb-6">
          <label htmlFor="pin_code" className="block text-gray-700">
            Pincode (அஞ்சல் குறியீடு): <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="pin_code"
            name="pin_code"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Pincode"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg font-semibold"
          >
            Choose your Plan
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

export default ContactInformationSection;
