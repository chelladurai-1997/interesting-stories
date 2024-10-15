import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";

interface ProfileExpectationsProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileExpectations: React.FC<ProfileExpectationsProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const expectations = profile.expectations ?? {};

  return (
    <Accordion
      title="Expectations"
      isOpen={openSection === "expectations"}
      onClick={() =>
        setOpenSection(openSection === "expectations" ? "" : "expectations")
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Jaadhagam"
          value={expectations.jaadhagam ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="Marital Status"
          value={expectations.marital_status ?? ""}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Working Place"
          value={expectations.working_place ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="Expecting Stars"
          value={expectations.expecting_stars ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="Expectation Info"
          value={expectations.expectation_info ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfileExpectations;
