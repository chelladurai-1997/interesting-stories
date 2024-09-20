import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";

interface ProfileFamilyDetailsProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileFamilyDetails: React.FC<ProfileFamilyDetailsProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const familyDetails = profile.familyDetails ?? {};

  return (
    <Accordion
      title="Family Details"
      isOpen={openSection === "familyDetails"}
      onClick={() =>
        setOpenSection(openSection === "familyDetails" ? "" : "familyDetails")
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Father's Name"
          value={familyDetails.fatherName ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="Father Status"
          value={familyDetails.fatherStatus ?? ""}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Mother's Name"
          value={familyDetails.motherName ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="Mother Status"
          value={familyDetails.motherStatus ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="Father's Occupation"
          value={familyDetails.fatherOccupation ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
        <StyledChip
          label="Mother's Occupation"
          value={familyDetails.motherOccupation ?? ""}
          backgroundColor="bg-pink-200"
          textColor="text-pink-800"
        />
        <StyledChip
          label="Mother's Kulam"
          value={familyDetails.motherKulam ?? ""}
          backgroundColor="bg-teal-200"
          textColor="text-teal-800"
        />
        <StyledChip
          label="Living Place"
          value={familyDetails.livingPlace ?? ""}
          backgroundColor="bg-gray-200"
          textColor="text-gray-800"
        />
        <StyledChip
          label="Native Place"
          value={familyDetails.nativePlace ?? ""}
          backgroundColor="bg-red-200"
          textColor="text-red-800"
        />
        <StyledChip
          label="Number of Brothers"
          value={familyDetails.noOfBrothers ?? ""}
          backgroundColor="bg-orange-200"
          textColor="text-orange-800"
        />
        {!isNaN(Number(familyDetails.noOfBrothers)) &&
          Number(familyDetails.noOfBrothers) > 0 && (
            <StyledChip
              label="Number of Brothers Married"
              value={familyDetails.noOfBrothersMarried ?? ""}
              backgroundColor="bg-lime-200"
              textColor="text-lime-800"
            />
          )}
        <StyledChip
          label="Number of Sisters"
          value={familyDetails.noOfSisters ?? ""}
          backgroundColor="bg-cyan-200"
          textColor="text-cyan-800"
        />
        {!isNaN(Number(familyDetails.noOfSistersMarried)) &&
          Number(familyDetails.noOfSistersMarried) > 0 && (
            <StyledChip
              label="Number of Sisters Married"
              value={familyDetails.noOfSistersMarried ?? ""}
              backgroundColor="bg-emerald-200"
              textColor="text-emerald-800"
            />
          )}
        <StyledChip
          label="Property"
          value={familyDetails.property ?? ""}
          backgroundColor="bg-violet-200"
          textColor="text-violet-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfileFamilyDetails;
