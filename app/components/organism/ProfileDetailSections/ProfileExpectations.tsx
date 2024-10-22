import React from "react";
import { Profile } from "@/app/profiles/profile.types";
import {
  DocumentTextIcon,
  HeartIcon,
  BuildingOfficeIcon,
  StarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfileExpectationsProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileExpectations: React.FC<ProfileExpectationsProps> = ({
  profile,
}) => {
  const expectations = profile.expectations ?? {};

  const rows = [
    {
      label: "Jaadhagam",
      value: expectations.jaadhagam,
      icon: DocumentTextIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "Marital Status",
      value: expectations.marital_status,
      icon: HeartIcon,
      iconColorClass: "text-green-500",
    },
    {
      label: "Working Place",
      value: expectations.working_place,
      icon: BuildingOfficeIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "Expecting Stars",
      value: expectations.expecting_stars,
      icon: StarIcon,
      iconColorClass: "text-indigo-500",
    },
    {
      label: "Expectation Info",
      value: expectations.expectation_info,
      icon: InformationCircleIcon,
      iconColorClass: "text-purple-500",
    },
  ];

  return <ProfileDetailsTable title="Expectations" rows={rows} />;
};

export default ProfileExpectations;
