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
import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onContactInfoFormSubmit } from "@/app/lib/actions/contactInfo.action";

const ContactInfoForm = () => {
  const [runAction, isRunning] = useServerAction(onContactInfoFormSubmit);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        alert("Something went wrong!");
      } else {
        // router.push("/profile-info/contact-details");
      }
    } catch (error) {}
  };
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactInfoForm;
