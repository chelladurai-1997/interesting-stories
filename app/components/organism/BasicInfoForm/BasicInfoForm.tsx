import {
  childrenLivingStatusOptions,
  genderLabelOptions,
  maritalStatusOptions,
  noOfChildrensOptions,
  profileCreatedByOptions,
} from "@/app/lib/constants/global.constant";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import Link from "next/link";

const BasicInfoForm = () => {
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <div className="text-center mb-6 space-y-3">
        <h4 className="text-lg font-semibold">Step 1 of 7</h4>
        <h1 className="text-2xl font-bold">Basic Information</h1>
        <p className="text-sm">Let's get started, Enter your details!</p>
      </div>
      <div className="form-login">
        <form autoComplete="off">
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name (முழு பெயர்):"
                id="name"
                name="name"
                placeholder="Enter your full name"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Gender (பாலினம்):"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                type="radio"
                name="gender"
                id="gender"
                options={genderLabelOptions}
                placeholder="Select Gender"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="D.O.B (பிறந்த நாள்):"
                id="dob"
                name="dob"
                placeholder="D.O.B"
                type="datetime-local"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Profile created by (பதிவு செய்பவர்):"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="profile_created_by"
                name="profile_created_by"
                type="select"
                options={profileCreatedByOptions}
                placeholder="Select Created by"
              />
            </div>

            <FormField
              label="Marital Status (திருமண நிலை):"
              className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              id="marital_status"
              name="marital_status"
              options={maritalStatusOptions}
              placeholder="Select Marital Status"
              type="select"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="No. of. Children (குழந்தைகள்):"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="children"
                name="children"
                options={noOfChildrensOptions}
                placeholder="Select No. of. Children"
                type="select"
              />

              <FormField
                id="children_living_status"
                label="Children Living Status (குழந்தைகள் வசிப்பது):"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                type="radio"
                name="children_living_status"
                options={childrenLivingStatusOptions}
                placeholder="Select Children Living Status"
              />
            </div>

            <FormField
              label="Profile Bio (சுயவிவர தகவல்):"
              type="textarea"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              id="profile_bio"
              name="profile_bio"
              placeholder="Profile biography"
            />
          </div>

          <p className="text-gray-500 text-sm mt-1">
            Note: This information will be displayed publicly so be careful with
            your information.
          </p>

          <div className="flex justify-end mt-8">
            <Link href={"/profile-info/personal-details"} className="w-full">
              <Button
                text="Save & Proceed"
                type="submit"
                icon={
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                  </svg>
                }
              />
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BasicInfoForm;
