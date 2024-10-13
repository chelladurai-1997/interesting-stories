"use client";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import {
  EDUCATION_OPTIONS,
  OCCUPATION_OPTIONS,
  MONTHLY_INCOME_OPTIONS,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { useEducationOccupationForm } from "@/app/lib/hooks/useEducationOccupationForm";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import FormContainer from "../../molecules/SectionContainer/SectionContainer";

const EducationOccupationForm = () => {
  const { isRunning, onSubmit } = useEducationOccupationForm();
  return (
    <FormContainer>
      <SectionHeader
        subtitle="Your information stays private with us!"
        step="Step 3 of 7"
        title="Education & Occupation"
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-4">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Education (கல்வி):"
                id="education"
                name="education"
                type="select"
                options={EDUCATION_OPTIONS}
                placeholder="Select Education"
              />

              <FormField
                label="Education Information (கல்வி விபரம்):"
                id="educationInfo"
                name="educationInfo"
                type="text"
                placeholder="Education Information"
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
              />

              <FormField
                label="Occupation Information (தொழில் விபரம்):"
                id="occupationInfo"
                name="occupationInfo"
                type="text"
                placeholder="Occupation Information"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Working Place (பணிபுரியுமிடம்):"
                id="workingPlace"
                name="workingPlace"
                type="text"
                placeholder="Working Place"
              />

              <FormField
                label="Monthly Income (மாத வருமானம்):"
                id="monthlyIncome"
                name="monthlyIncome"
                type="select"
                options={MONTHLY_INCOME_OPTIONS}
                placeholder="Select Monthly Income"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              text={"Save & Proceed"}
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

export default EducationOccupationForm;
