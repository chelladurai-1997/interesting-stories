"use client";

import { useState, useEffect } from "react";
import {
  ageOptions,
  districtOptions,
  educationOptions,
  genderLabelOptions,
  genderOptions,
  jathagamStatusOptions,
  maritalStatusOptions,
  OCCUPATION_OPTIONS,
} from "@/app/lib/constants/global.constant";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";

function FilterModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [animate, setAnimate] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Toggle the animation every 5 seconds
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimate((prev) => !prev); // Toggle animation class
    }, 5000); // Every 5 seconds

    return () => clearInterval(animationInterval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="fixed end-6 bottom-6 group ">
      {!isModalOpen && (
        <button
          type="button"
          onClick={openModal}
          className={`flex items-center justify-center text-white bg-gray-600 rounded-full w-14 h-14 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none transition-all duration-300 ${
            animate ? "animate-bounce" : ""
          }`}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white text-gray-900 py-8 px-8 w-full max-w-lg md:max-w-3xl md:mx-auto rounded-lg shadow-lg overflow-auto h-full md:h-auto">
            {/* Close button with inline SVG */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
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
                />

                {/* Marital Status */}
                <FormField
                  label="Marital Status (திருமண நிலை):"
                  id="marital_status"
                  name="marital_status"
                  type="select"
                  options={maritalStatusOptions}
                  placeholder="Select Marital Status"
                  searchable={false}
                  required={false}
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
                    />
                    <FormField
                      label="State (மாநிலம்):"
                      id="state"
                      name="state"
                      placeholder="Select State"
                      options={districtOptions} // Assuming districtOptions also includes states
                      type="select"
                      required={false}
                    />
                    <FormField
                      label="District (மாவட்டம்):"
                      id="district"
                      name="district"
                      placeholder="Select District"
                      options={districtOptions}
                      type="select"
                      required={false}
                    />
                  </>
                )}

                <div className="text-center md:col-span-2">
                  <Button text="Search" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterModal;
