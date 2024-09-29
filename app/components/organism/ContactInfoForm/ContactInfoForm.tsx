"use client";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import {
  countriesOptions,
  stateOptions,
  districtOptions,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { useContactInfoForm } from "@/app/lib/hooks/useContactInfoForm";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import LoadingIndicator from "../../molecules/LoadingIndicator/LoadingIndicator";
import SuccessPopup from "../../molecules/SuccessPopup/SuccessPopup";
import FormContainer from "../../molecules/SectionContainer/SectionContainer";

const ContactInfoForm = () => {
  const { isRunning, onSubmit, isSuccessPopupOpen, handleSuccessPopupClose } =
    useContactInfoForm();
  return (
    <FormContainer>
      <SectionHeader
        subtitle="This is the last bit of information we require."
        step="Step 7 of 7"
        title="Contact Information"
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile No */}
              <FormField
                label="Mobile no: (அலைபேசி எண்):"
                id="mobile"
                name="mobile"
                placeholder="Mobile number"
              />

              <FormField
                id="sameAsMobile"
                name="sameAsMobile"
                type="checkbox"
                label="WhatsApp number same as Mobile"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Whatsapp No (வாட்ஸ்அப் எண்):"
                id="whatsapp"
                name="whatsapp"
                placeholder="WhatsApp number"
              />
              <FormField
                label="Country (நாடு):"
                id="country"
                name="country"
                placeholder="Select Country"
                options={countriesOptions}
                type="select"
                searchable={false}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="State (மாநிலம்):"
                id="state"
                name="state"
                placeholder="Select State"
                options={stateOptions}
                type="select"
              />

              <FormField
                label="District (மாவட்டம்):"
                id="district"
                name="district"
                placeholder="Select District"
                options={districtOptions}
                type="select"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Section */}
              <FormField
                label="Permanent Address (முகவரி):"
                id="address"
                name="address"
                placeholder="Full Address"
                type="textarea"
              />

              <FormField
                label="Photo (புகைப்படம்):"
                id="photo"
                name="photo"
                type="file"
                className="border border-gray-300 rounded-md p-2"
              />
              {/* <FormField
                label="Pincode (அஞ்சல் குறியீடு):"
                id="pin_code"
                name="pin_code"
                placeholder="Pincode"
                type="number"
              /> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Pincode (அஞ்சல் குறியீடு):"
                id="pin_code"
                name="pin_code"
                placeholder="Pincode"
                type="number"
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
            {isRunning && <LoadingIndicator />}
            {isSuccessPopupOpen && (
              <SuccessPopup isOpen={true} onClose={handleSuccessPopupClose} />
            )}
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default ContactInfoForm;
