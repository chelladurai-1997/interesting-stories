"use client";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import {
  jathagamStatusOptions,
  maritalStatusOptions,
  workingPlaceOptions,
  zodiacNakshatras,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";

import { useExpectationForm } from "@/app/lib/hooks/useExpectationForm";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import FormContainer from "../../molecules/SectionContainer/SectionContainer";

const ExpectationForm = () => {
  const { isRunning, onSubmit } = useExpectationForm();
  return (
    <FormContainer>
      <SectionHeader
        subtitle="Share Your Expectations with Us"
        step="Step 6 of 7"
        title="Expectation"
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

export default ExpectationForm;
