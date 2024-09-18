import React from "react";
import StyledChip from "../../molecules/StyledChip/StyledChip";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Profile } from "@/app/profiles/profile.types";

interface ProfileHoroscopeInfoProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileHoroscopeInfo: React.FC<ProfileHoroscopeInfoProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const horoscopeInfo = profile.horoscopeInfo ?? {};

  return (
    <Accordion
      title="Horoscope Info"
      isOpen={openSection === "horoscopeInfo"}
      onClick={() =>
        setOpenSection(openSection === "horoscopeInfo" ? "" : "horoscopeInfo")
      }
    >
      <div className="space-y-2 text-gray-800">
        <StyledChip
          label="Raasi"
          value={horoscopeInfo.raasi ?? ""}
          backgroundColor="bg-blue-200"
          textColor="text-blue-800"
        />
        <StyledChip
          label="Nachathiram"
          value={horoscopeInfo.nachathiram ?? ""}
          backgroundColor="bg-green-200"
          textColor="text-green-800"
        />
        <StyledChip
          label="Lagnam"
          value={horoscopeInfo.lagnam ?? ""}
          backgroundColor="bg-yellow-200"
          textColor="text-yellow-800"
        />
        <StyledChip
          label="Dhisai Irupu"
          value={horoscopeInfo.dhisaiIrupu ?? ""}
          backgroundColor="bg-indigo-200"
          textColor="text-indigo-800"
        />
        <StyledChip
          label="Dhosam"
          value={horoscopeInfo.dhosam ?? ""}
          backgroundColor="bg-purple-200"
          textColor="text-purple-800"
        />
      </div>
    </Accordion>
  );
};

export default ProfileHoroscopeInfo;
