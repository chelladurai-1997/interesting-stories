"use client";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import {
  bloodGroupOptions,
  casteOptions,
  complexionOptions,
  heightOptions,
  kulaDheivamOptions,
  kulamOptions,
  physicallyChallengedOptions,
  religionOptions,
  weightOptions,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { usePersonalDetailsForm } from "@/app/lib/hooks/usePersonalDetailsForm";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import FormContainer from "../../molecules/SectionContainer/SectionContainer";

const PersonalDetailsForm = () => {
  const { onSubmit, isRunning } = usePersonalDetailsForm();

  return (
    <FormContainer>
      <SectionHeader
        subtitle="Your information stays secure with us!"
        step="Step 2 of 7"
        title="Personal Information"
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Religion (மதம்): *"
                id="religion"
                name="religion"
                placeholder="Select Religion"
                type="select"
                options={religionOptions}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Caste (சாதி): *"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                type="select"
                name="caste"
                id="caste"
                options={casteOptions}
                placeholder="Select Caste"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Kulam (குலம்): *"
                id="kulam"
                name="kulam"
                placeholder="Select Caste"
                type="select"
                options={kulamOptions}
                searchable
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Kula Deivam (கோயில்): *"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="kula_deivam"
                name="kula_deivam"
                type="select"
                options={kulaDheivamOptions}
                searchable
                placeholder="Select Kula Deivam"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Height (உயரம்): *"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="height"
                name="height"
                options={heightOptions}
                placeholder="Select Height"
                type="select"
              />
              <FormField
                label="Complexion (நிறம்): *"
                type="select"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="complexion"
                name="complexion"
                placeholder="Select Complexion"
                options={complexionOptions}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Weight (in kg) (எடை): *"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="weight"
                name="weight"
                options={weightOptions}
                placeholder="Select Weight"
                type="select"
              />

              <FormField
                id="blood_group"
                label="Blood Group (இரத்த வகை): *"
                className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                type="select"
                name="blood_group"
                options={bloodGroupOptions}
                placeholder="Select Blood Group"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Are you Physically Challenged Person? (மாற்றுத் திறனாளி): *"
                type="radio"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="physically_challenged"
                name="physically_challenged"
                options={physicallyChallengedOptions}
              />
              <FormField
                label="Specify details: *"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="physical_challenge_details"
                name="physical_challenge_details"
                options={physicallyChallengedOptions}
                placeholder="Enter special abilities"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              text="Save & Proceed"
              type="submit"
              icon={<ArrowRightIcon />}
              isPending={isRunning}
            />
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default PersonalDetailsForm;
