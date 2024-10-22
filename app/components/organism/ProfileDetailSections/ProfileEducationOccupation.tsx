import React from "react";
import { Profile } from "@/app/profiles/profile.types";
import { concatenateNonEmpty } from "@/app/lib/utils/stringUtils";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfileEducationOccupationProps {
  profile: Profile;
}

const ProfileEducationOccupation: React.FC<ProfileEducationOccupationProps> = ({
  profile,
}) => {
  const educationOccupation = profile.educationOccupation ?? {};

  const rows = [
    {
      label: "Education Info",
      value: concatenateNonEmpty(
        educationOccupation.education,
        educationOccupation.educationInfo
      ),
      icon: AcademicCapIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "Occupation Info",
      value: concatenateNonEmpty(
        educationOccupation.occupation,
        educationOccupation.occupationInfo
      ),
      icon: BriefcaseIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "Working Place",
      value: educationOccupation.workingPlace,
      icon: BuildingOfficeIcon,
      iconColorClass: "text-purple-500",
    },
    {
      label: "Monthly Income",
      value: educationOccupation.monthlyIncome,
      icon: CurrencyDollarIcon,
      iconColorClass: "text-pink-500",
    },
  ];

  return <ProfileDetailsTable title="Education & Occupation" rows={rows} />;
};

export default ProfileEducationOccupation;
