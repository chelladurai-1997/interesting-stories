"use client";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import {
  countriesOptions,
  stateOptions,
  districtOptions,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { calculatePercentageCompleted } from "@/app/lib/utils/calculateCompletedPercent";
import { useContactInfoForm } from "@/app/lib/hooks/useContactInfoForm";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import LoadingIndicator from "../../molecules/LoadingIndicator/LoadingIndicator";

const ContactInfoForm = () => {
  const { isRunning, onSubmit } = useContactInfoForm();
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="This is the last bit of information we require."
        step="Step 7 of 7"
        title="Contact Information"
        registerPercentCompleted={calculatePercentageCompleted(6, 7)}
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
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                id="sameAsMobile"
                name="sameAsMobile"
                type="checkbox"
                label="WhatsApp number same as Mobile"
                className="mt-1 block w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Whatsapp No (வாட்ஸ்அப் எண்):"
                id="whatsapp"
                name="whatsapp"
                placeholder="WhatsApp number"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <FormField
                label="Country (நாடு):"
                id="country"
                name="country"
                placeholder="Select Country"
                options={countriesOptions}
                type="select"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="District (மாவட்டம்):"
                id="district"
                name="district"
                placeholder="Select District"
                options={districtOptions}
                type="select"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              /> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Pincode (அஞ்சல் குறியீடு):"
                id="pin_code"
                name="pin_code"
                placeholder="Pincode"
                type="number"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactInfoForm;
