import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";

interface ProfilePersonalDetailsProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfilePersonalDetails: React.FC<ProfilePersonalDetailsProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const personalDetails = profile.personalDetails ?? {};

  return (
    <Accordion
      title="Personal Details"
      isOpen={openSection === "personalDetails"}
      onClick={() =>
        setOpenSection(
          openSection === "personalDetails" ? "" : "personalDetails"
        )
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Religion"
          value={personalDetails.religion ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="Caste"
          value={personalDetails.caste ?? ""}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Kulam"
          value={personalDetails.kulam ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="Kula Deivam"
          value={personalDetails.kula_deivam ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="Height"
          value={personalDetails.height ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
        <StyledChip
          label="Complexion"
          value={personalDetails.complexion ?? ""}
          backgroundColor="bg-pink-200"
          textColor="text-pink-800"
        />
        <StyledChip
          label="Weight"
          value={personalDetails.weight ?? ""}
          backgroundColor="bg-teal-200"
          textColor="text-teal-800"
        />
        <StyledChip
          label="Blood Group"
          value={personalDetails.blood_group ?? ""}
          backgroundColor="bg-gray-200"
          textColor="text-gray-800"
        />
        <StyledChip
          label="Physically Challenged"
          value={personalDetails.physically_challenged ? "Yes" : "No"}
          backgroundColor="bg-red-200"
          textColor="text-red-800"
        />
        <StyledChip
          label="Physical Challenge Details"
          value={personalDetails.physical_challenge_details ?? ""}
          backgroundColor="bg-orange-200"
          textColor="text-orange-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfilePersonalDetails;
