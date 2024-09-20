"use client";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { kulamOptions } from "@/app/lib/constants/global.constant";
import { useFamilyInfoForm } from "@/app/lib/hooks/useFamilyInfoForm";

const FamilyInfoForm = () => {
  const { isRunning, onSubmit } = useFamilyInfoForm();
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="Tell us a bit about your family!"
        step="Step 4 of 7"
        title="Family Information"
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Father Name (தந்தை பெயர்): *"
                id="father_name"
                name="father_name"
                type="text"
                placeholder="Father Name"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Father Status (தந்தை நிலை): *"
                id="father_status"
                name="father_status"
                type="radio"
                options={["Yes", "No"]}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Mother Name (தாய் பெயர்): *"
                id="mother_name"
                name="mother_name"
                type="text"
                placeholder="Mother Name"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Mother Status (தாய் நிலை): *"
                id="mother_status"
                name="mother_status"
                type="radio"
                options={["Yes", "No"]}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Father Occupation (தந்தை தொழில்): *"
                id="father_occupation"
                name="father_occupation"
                type="text"
                placeholder="Father Occupation"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Mother Occupation (தாய் தொழில்): *"
                id="mother_occupation"
                name="mother_occupation"
                type="text"
                placeholder="Mother Occupation"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Mother Kulam (தாய் பிறந்த குலம்): *"
                id="mother_kulam"
                name="mother_kulam"
                type="select"
                placeholder="Select Mother Kulam"
                options={kulamOptions}
                searchable
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Family Living Place (இருப்பிடம்): *"
                id="living_place"
                name="living_place"
                type="text"
                placeholder="Family Living Place"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Native Place (பூர்வீகம்): *"
                id="native_place"
                name="native_place"
                type="text"
                placeholder="Native Place"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <FormField
                label="No of Brothers (சகோதரர்களின் எண்ணிக்கை): *"
                id="no_of_brothers"
                name="no_of_brothers"
                type="number"
                placeholder="No of Brothers"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="No of Brothers Married (திருமணமான சகோதரர்களின் எண்ணிக்கை): *"
                id="no_of_brothers_married"
                name="no_of_brothers_married"
                type="number"
                placeholder="No of Brothers Married"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <FormField
                label="No of Sisters (சகோதரிகளின் எண்ணிக்கை): *"
                id="no_of_sisters"
                name="no_of_sisters"
                type="number"
                placeholder="No of Sisters"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="No of Sisters Married (திருமணமான சகோதரிகளின் எண்ணிக்கை): *"
                id="no_of_sisters_married"
                name="no_of_sisters_married"
                type="number"
                placeholder="No of Sisters Married"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <FormField
                label="Property (சொத்து): *"
                id="property"
                name="property"
                type="text"
                placeholder="Property"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <FormField
                label="Property Info (சொத்து விபரம்): *"
                id="property"
                name="property"
                type="textarea"
                placeholder="Enter Property Info"
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              text={
                isRunning ? "Almost done, few seconds left !" : "Save & Proceed"
              }
              type="submit"
              icon={
                !isRunning && (
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
                )
              }
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default FamilyInfoForm;
