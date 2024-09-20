import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";
import { formatDate } from "@/app/lib/utils/dateUtils";

interface ProfileBasicInfoProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const basicInfo = profile.basicInfo ?? {};

  return (
    <Accordion
      title="Basic Information"
      isOpen={openSection === "basicInfo"}
      onClick={() =>
        setOpenSection(openSection === "basicInfo" ? "" : "basicInfo")
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Name"
          value={basicInfo.name ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="Date of Birth"
          value={formatDate(basicInfo.dob ?? "")}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Gender"
          value={basicInfo.gender ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="Profile Created By"
          value={basicInfo.profile_created_by ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="Marital Status"
          value={basicInfo.marital_status ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
        <StyledChip
          label="Children"
          value={basicInfo.children ?? ""}
          backgroundColor="bg-pink-200"
          textColor="text-pink-800"
        />
        <StyledChip
          label="Children Living Status"
          value={basicInfo.children_living_status ?? ""}
          backgroundColor="bg-teal-200"
          textColor="text-teal-800"
        />
        <StyledChip
          label="Profile Bio"
          value={basicInfo.profile_bio ?? ""}
          backgroundColor="bg-gray-200"
          textColor="text-gray-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfileBasicInfo;
