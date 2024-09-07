"use client";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import {
  jaadhagamOptions,
  jathagamStatusOptions,
  maritalStatusOptions,
  workingPlaceOptions,
  zodiacNakshatras,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { calculatePercentageCompleted } from "@/app/lib/utils/calculateCompletedPercent";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onExpectationsInfoFormSubmit } from "@/app/lib/actions/expectationInfo.action";

const ExpectationForm = () => {
  const [runAction, isRunning] = useServerAction(onExpectationsInfoFormSubmit);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        alert("Something went wrong!");
      } else {
        router.push("/profile-info/contact-details");
      }
    } catch (error) {}
  };
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="Share Your Expectations with Us"
        step="Step 6 of 7"
        title="Expectation"
        registerPercentCompleted={calculatePercentageCompleted(4, 7)}
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jaadhagam */}
              <FormField
                label="Jaadhagam (ஜாதகம்):"
                id="jaadhagam"
                name="jaadhagam"
                type="select"
                options={jathagamStatusOptions}
                placeholder="Select Jaadhagam"
              />

              {/* Marital Status */}
              <FormField
                label="Marital Status (திருமண நிலை):"
                id="marital_status"
                name="marital_status"
                type="select"
                options={maritalStatusOptions}
                placeholder="Select Marital Status"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Working Place */}
              <FormField
                label="Working Place (பணியிடம்):"
                id="working_place"
                name="working_place"
                type="select"
                options={workingPlaceOptions}
                placeholder="Select Working Place"
              />

              {/* Expecting Stars */}
              <FormField
                label="Expecting Stars (பொருத்தம் நட்சத்திரம்):"
                id="expecting_stars"
                name="expecting_stars"
                type="select"
                options={zodiacNakshatras}
                multiselect
                placeholder="Select Matching Stars"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expectation */}
              <FormField
                label="Expectation (எதிர்பார்ப்பு):"
                id="expectation_info"
                name="expectation_info"
                type="textarea"
                placeholder="Expectation"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            {/* <Link href={"/profile-info/contact-details"} className="w-full"> */}
            <Button
              text={isRunning ? "Saving..." : "Save & Proceed"}
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
    </section>
  );
};

export default ExpectationForm;
