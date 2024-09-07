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
import { calculatePercentageCompleted } from "@/app/lib/utils/calculateCompletedPercent";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onPersonalInfoFormSubmit } from "@/app/lib/actions/personalInfo.action";
import { useRouter } from "next/navigation";

const PersonalDetailsForm = () => {
  const [runAction, isRunning] = useServerAction(onPersonalInfoFormSubmit);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        alert("Something went wrong!");
      } else {
        router.push("/profile-info/education-details");
      }
    } catch (error) {}
  };
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="Your information stays secure with us!"
        step="Step 2 of 7"
        title="Personal Information"
        registerPercentCompleted={calculatePercentageCompleted(1, 7)}
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
              text={
                isRunning
                  ? "Hold on! Saving your information."
                  : "Save & Proceed"
              }
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default PersonalDetailsForm;
