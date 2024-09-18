import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";

interface ProfileContactInfoProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileContactInfo: React.FC<ProfileContactInfoProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const contactInfo = profile.contactInfo ?? {};

  return (
    <Accordion
      title="Contact Information"
      isOpen={openSection === "contactInfo"}
      onClick={() =>
        setOpenSection(openSection === "contactInfo" ? "" : "contactInfo")
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Mobile"
          value={contactInfo.mobile ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="WhatsApp"
          value={contactInfo.whatsapp ?? ""}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Country"
          value={contactInfo.country ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="State"
          value={contactInfo.state ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="District"
          value={contactInfo.district ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
        <StyledChip
          label="Address"
          value={contactInfo.address ?? ""}
          backgroundColor="bg-pink-200"
          textColor="text-pink-800"
        />
        <StyledChip
          label="Pin Code"
          value={contactInfo.pin_code ?? ""}
          backgroundColor="bg-teal-200"
          textColor="text-teal-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfileContactInfo;
