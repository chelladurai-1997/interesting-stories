"use client";
import {
  childrenLivingStatusOptions,
  genderLabelOptions,
  maritalStatusOptions,
  noOfChildrensOptions,
  profileCreatedByOptions,
} from "@/app/lib/constants/global.constant";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { useRouter } from "next/navigation";
import { onBasicInfoFormSubmit } from "@/app/lib/actions/basicInfo.action";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import LoadingIndicator from "../../molecules/LoadingIndicator/LoadingIndicator";

const BasicInfoForm = () => {
  const [runAction, isRunning] = useServerAction(onBasicInfoFormSubmit);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        alert("Something went wrong!");
      } else {
        router.push("/profile-info/personal-details");
      }
    } catch (error) {}
  };
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="Let's get started, Enter your details!"
        step="Step 1 of 7"
        title="Basic Information"
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name (முழு பெயர்):"
                id="name"
                name="name"
                placeholder="Enter your full name"
                type="text"
              />

              <FormField
                label="Gender (பாலினம்):"
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
                // maxDate={getMaxDateForAge(18)}
              />

              <FormField
                label="Profile created by (பதிவு செய்பவர்):"
                id="profile_created_by"
                name="profile_created_by"
                type="select"
                options={profileCreatedByOptions}
                placeholder="Select Created by"
              />
            </div>

            <FormField
              label="Marital Status (திருமண நிலை):"
              id="marital_status"
              name="marital_status"
              options={maritalStatusOptions}
              placeholder="Select Marital Status"
              type="select"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="No. of. Children (குழந்தைகள்):"
                id="children"
                name="children"
                options={noOfChildrensOptions}
                placeholder="Select No. of. Children"
                type="select"
              />

              <FormField
                id="children_living_status"
                label="Children Living Status (குழந்தைகள் வசிப்பது):"
                type="radio"
                name="children_living_status"
                options={childrenLivingStatusOptions}
                placeholder="Select Children Living Status"
              />
            </div>

            <FormField
              label="Profile Bio (சுயவிவர தகவல்):"
              type="textarea"
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
            {/* <Link href={"/profile-info/personal-details"} className="w-full"> */}
            <Button
              text={isRunning ? "Loading..." : "Save & Proceed"}
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
            {/* </Link> */}
          </div>
        </form>
      </div>
      {isRunning && <LoadingIndicator />}{" "}
    </section>
  );
};

export default BasicInfoForm;
