"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ageOptions,
  districtOptions,
  genderOptions,
  jathagamStatusOptions,
  maritalStatusOptions,
  OCCUPATION_OPTIONS,
  stateOptions,
} from "@/app/lib/constants/global.constant";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";

const FilterModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const router = useRouter(); // Initialize the router
  const searchParams = useSearchParams(); // Get search parameters from the URL

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Toggle the animation every 3 seconds
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimate((prev) => !prev); // Toggle animation class
    }, 3000); // Every 3 seconds

    return () => clearInterval(animationInterval); // Clean up the interval on component unmount
  }, []);

  // Function to retrieve default values from search params
  const getDefaultValues = () => {
    const defaults: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      defaults[key] = value; // Map search params to defaults
    });
    return defaults;
  };

  const handleSubmit = () => {
    const formData = new FormData(
      document.querySelector("form") as HTMLFormElement
    );
    const queryParams = new URLSearchParams();

    // Append form data to URLSearchParams
    formData.forEach((value, key) => {
      if (value) {
        // Avoid adding empty values
        queryParams.append(key, value.toString());
      }
    });

    // Update the URL with new query parameters
    router.push(`?${queryParams.toString()}`);
    closeModal(); // Close the modal after submission
  };

  // Get default values based on search parameters
  const defaultValues = getDefaultValues();

  return (
    <div className="fixed end-6 bottom-6 group">
      {!isModalOpen && (
        <button
          type="button"
          onClick={openModal}
          className={`flex items-center justify-center text-white bg-gray-600 rounded-full w-14 h-14 hover:bg-gray-700 focus:ring-4 ${
            animate ? "ring-4 ring-gray-300 outline-none " : ""
          } focus:ring-gray-300 focus:outline-none transition-all duration-300`}
        >
          {/* Filter Icon */}
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16M4 10h12M4 16h8" />
          </svg>
          <span className="sr-only">Open filters</span>
        </button>
      )}

      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 `}
        >
          <div className="relative bg-white text-gray-900 py-8 px-8 w-full max-w-lg md:max-w-3xl md:mx-auto md:rounded-lg shadow-lg overflow-auto h-full md:h-auto">
            {/* Close button with inline SVG */}
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 text-gray-500 hover:text-gray-800`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="sr-only">Close</span>
            </button>

            <h2 className="text-3xl font-bold mb-4 text-center">
              Filter Profiles
            </h2>

            {/* Filter Form */}
            <div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="I'm looking for"
                  id="gender"
                  options={genderOptions}
                  placeholder="I'm looking for"
                  type="select"
                  name="gender"
                  required={false}
                  searchable={false}
                  defaultValue={defaultValues.gender} // Set default value
                />
                <FormField
                  label="Age"
                  id="age"
                  options={ageOptions}
                  placeholder="Age"
                  type="select"
                  name="age"
                  searchable={false}
                  required={false}
                  defaultValue={defaultValues.age} // Set default value
                />
                <FormField
                  label="Jaadhagam (ஜாதகம்):"
                  id="jaadhagam"
                  name="jaadhagam"
                  type="select"
                  options={jathagamStatusOptions}
                  placeholder="Select Jaadhagam"
                  searchable={false}
                  required={false}
                  defaultValue={defaultValues.jaadhagam} // Set default value
                />
                <FormField
                  label="Marital Status (திருமண நிலை):"
                  id="marital_status"
                  name="marital_status"
                  type="select"
                  options={maritalStatusOptions}
                  placeholder="Select Marital Status"
                  searchable={false}
                  required={false}
                  defaultValue={defaultValues.marital_status} // Set default value
                />

                {/* Advanced Filters Link */}
                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-gray-500 hover:underline underline mb-2 md:col-span-2"
                  style={{
                    color: "#202124",
                    textDecoration: "underline",
                    textDecorationColor: "#5e5e5e",
                  }}
                >
                  {showAdvancedFilters
                    ? "Hide Advanced Filters"
                    : "Show Advanced Filters"}
                </button>

                {/* Advanced Filter Fields */}
                {showAdvancedFilters && (
                  <>
                    <FormField
                      label="Occupation (தொழில் வகை):"
                      id="occupation"
                      name="occupation"
                      type="select"
                      options={OCCUPATION_OPTIONS}
                      placeholder="Select Occupation"
                      defaultValue={defaultValues.occupation} // Set default value
                    />
                    <FormField
                      label="State (மாநிலம்):"
                      id="state"
                      name="state"
                      placeholder="Select State"
                      options={stateOptions} // Assuming districtOptions also includes states
                      type="select"
                      required={false}
                      defaultValue={defaultValues.state} // Set default value
                    />
                    <FormField
                      label="District (மாவட்டம்):"
                      id="district"
                      name="district"
                      placeholder="Select District"
                      options={districtOptions}
                      type="select"
                      required={false}
                      defaultValue={defaultValues.district} // Set default value
                    />
                  </>
                )}

                <div className="text-center md:col-span-2">
                  <Button text="Search" onClick={handleSubmit} type="button" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
