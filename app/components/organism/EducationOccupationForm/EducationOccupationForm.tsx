import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import Link from "next/link";
import {
  EDUCATION_OPTIONS,
  OCCUPATION_OPTIONS,
  MONTHLY_INCOME_OPTIONS,
} from "@/app/lib/constants/global.constant";

const EducationOccupationForm = () => {
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <div className="text-center mb-6 space-y-3">
        <h4 className="text-lg font-semibold">Step 3 of 7</h4>
        <h1 className="text-2xl font-bold">Education & Occupation</h1>
        <p className="text-sm">We won't share it unnecessarily!</p>
      </div>
      <div className="form-login">
        <form autoComplete="off">
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Education (கல்வி):"
                id="education"
                name="education"
                type="select"
                options={EDUCATION_OPTIONS}
                placeholder="Select Education"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Education Information (கல்வி விபரம்):"
                id="educationInfo"
                name="educationInfo"
                type="text"
                placeholder="Education Information"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Occupation (தொழில்):"
                id="occupation"
                name="occupation"
                type="select"
                options={OCCUPATION_OPTIONS}
                placeholder="Select Occupation"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Occupation Information (தொழில் விபரம்):"
                id="occupationInfo"
                name="occupationInfo"
                type="text"
                placeholder="Occupation Information"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Working Place (பணிபுரியுமிடம்):"
                id="workingPlace"
                name="workingPlace"
                type="text"
                placeholder="Working Place"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Monthly Income (மாத வருமானம்):"
                id="monthlyIncome"
                name="monthlyIncome"
                type="select"
                options={MONTHLY_INCOME_OPTIONS}
                placeholder="Select Monthly Income"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Link href={"/profile-info/family-details"} className="w-full">
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

export default EducationOccupationForm;
