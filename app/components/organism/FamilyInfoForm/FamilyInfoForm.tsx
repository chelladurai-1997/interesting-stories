"use client";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { kulamOptions } from "@/app/lib/constants/global.constant";
import { useFamilyInfoForm } from "@/app/lib/hooks/useFamilyInfoForm";
import FormContainer from "../../molecules/SectionContainer/SectionContainer";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

const FamilyInfoForm = () => {
  const { isRunning, onSubmit } = useFamilyInfoForm();
  return (
    <FormContainer>
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
              />

              <FormField
                label="Father Status (தந்தை நிலை): *"
                id="father_status"
                name="father_status"
                type="radio"
                options={["Yes", "No"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Mother Name (தாய் பெயர்): *"
                id="mother_name"
                name="mother_name"
                type="text"
                placeholder="Mother Name"
              />

              <FormField
                label="Mother Status (தாய் நிலை): *"
                id="mother_status"
                name="mother_status"
                type="radio"
                options={["Yes", "No"]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Father Occupation (தந்தை தொழில்): *"
                id="father_occupation"
                name="father_occupation"
                type="text"
                placeholder="Father Occupation"
              />

              <FormField
                label="Mother Occupation (தாய் தொழில்): *"
                id="mother_occupation"
                name="mother_occupation"
                type="text"
                placeholder="Mother Occupation"
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
              />

              <FormField
                label="Family Living Place (இருப்பிடம்): *"
                id="living_place"
                name="living_place"
                type="text"
                placeholder="Family Living Place"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Native Place (பூர்வீகம்): *"
                id="native_place"
                name="native_place"
                type="text"
                placeholder="Native Place"
              />
              <FormField
                label="No of Brothers (சகோதரர்களின் எண்ணிக்கை): *"
                id="no_of_brothers"
                name="no_of_brothers"
                type="number"
                placeholder="No of Brothers"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="No of Brothers Married (திருமணமான சகோதரர்களின் எண்ணிக்கை): *"
                id="no_of_brothers_married"
                name="no_of_brothers_married"
                type="number"
                placeholder="No of Brothers Married"
              />
              <FormField
                label="No of Sisters (சகோதரிகளின் எண்ணிக்கை): *"
                id="no_of_sisters"
                name="no_of_sisters"
                type="number"
                placeholder="No of Sisters"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="No of Sisters Married (திருமணமான சகோதரிகளின் எண்ணிக்கை): *"
                id="no_of_sisters_married"
                name="no_of_sisters_married"
                type="number"
                placeholder="No of Sisters Married"
              />
              <FormField
                label="Property (சொத்து): *"
                id="property"
                name="property"
                type="text"
                placeholder="Property"
              />
              <FormField
                label="Property Info (சொத்து விபரம்): *"
                id="property"
                name="property"
                type="textarea"
                placeholder="Enter Property Info"
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

export default FamilyInfoForm;
