import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";

interface ProfileEducationOccupationProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileEducationOccupation: React.FC<ProfileEducationOccupationProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const educationOccupation = profile.educationOccupation ?? {};

  return (
    <Accordion
      title="Education & Occupation"
      isOpen={openSection === "educationOccupation"}
      onClick={() =>
        setOpenSection(
          openSection === "educationOccupation" ? "" : "educationOccupation"
        )
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Education"
          value={educationOccupation.education ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="Education Info"
          value={educationOccupation.educationInfo ?? ""}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Occupation"
          value={educationOccupation.occupation ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="Occupation Info"
          value={educationOccupation.occupationInfo ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="Working Place"
          value={educationOccupation.workingPlace ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
        <StyledChip
          label="Monthly Income"
          value={educationOccupation.monthlyIncome ?? ""}
          backgroundColor="bg-pink-200"
          textColor="text-pink-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfileEducationOccupation;