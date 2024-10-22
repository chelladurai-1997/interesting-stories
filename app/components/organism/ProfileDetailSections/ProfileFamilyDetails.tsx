import React from "react";
import { Profile } from "@/app/profiles/profile.types";
import {
  UserIcon,
  HeartIcon,
  BriefcaseIcon,
  MapPinIcon,
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfileFamilyDetailsProps {
  profile: Profile;
}

const ProfileFamilyDetails: React.FC<ProfileFamilyDetailsProps> = ({
  profile,
}) => {
  const familyDetails = profile.familyDetails ?? {};

  const rows = [
    {
      label: "Father's Name",
      value: familyDetails.fatherName || "Not provided",
      icon: UserIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "Father Status",
      value: familyDetails.fatherStatus || "Not provided",
      icon: HeartIcon,
      iconColorClass: "text-green-500",
    },
    {
      label: "Mother's Name",
      value: familyDetails.motherName || "Not provided",
      icon: UserIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "Mother Status",
      value: familyDetails.motherStatus || "Not provided",
      icon: HeartIcon,
      iconColorClass: "text-indigo-500",
    },
    {
      label: "Father's Occupation",
      value: familyDetails.fatherOccupation || "Not provided",
      icon: BriefcaseIcon,
      iconColorClass: "text-purple-500",
    },
    {
      label: "Mother's Occupation",
      value: familyDetails.motherOccupation || "Not provided",
      icon: BriefcaseIcon,
      iconColorClass: "text-pink-500",
    },
    {
      label: "Mother's Kulam",
      value: familyDetails.motherKulam || "Not provided",
      icon: BuildingOfficeIcon,
      iconColorClass: "text-teal-500",
    },
    {
      label: "Living Place",
      value: familyDetails.livingPlace || "Not provided",
      icon: MapPinIcon,
      iconColorClass: "text-gray-500",
    },
    {
      label: "Native Place",
      value: familyDetails.nativePlace || "Not provided",
      icon: HomeIcon,
      iconColorClass: "text-red-500",
    },
    {
      label: "Number of Brothers",
      value: familyDetails.noOfBrothers || "Not provided",
      icon: UsersIcon,
      iconColorClass: "text-orange-500",
    },
    {
      label: "Number of Sisters",
      value: familyDetails.noOfSisters || "Not provided",
      icon: UsersIcon,
      iconColorClass: "text-cyan-500",
    },
    {
      label: "Property",
      value: familyDetails.property || "Not provided",
      icon: CurrencyDollarIcon,
      iconColorClass: "text-violet-500",
    },
  ];

  // Add additional rows for married siblings only if applicable
  if (
    !isNaN(Number(familyDetails.noOfBrothers)) &&
    Number(familyDetails.noOfBrothers) > 0
  ) {
    rows.push({
      label: "Number of Brothers Married",
      value: familyDetails.noOfBrothersMarried || "Not provided",
      icon: UsersIcon,
      iconColorClass: "text-lime-500",
    });
  }

  if (
    !isNaN(Number(familyDetails.noOfSistersMarried)) &&
    Number(familyDetails.noOfSistersMarried) > 0
  ) {
    rows.push({
      label: "Number of Sisters Married",
      value: familyDetails.noOfSistersMarried || "Not provided",
      icon: UsersIcon,
      iconColorClass: "text-emerald-500",
    });
  }

  return <ProfileDetailsTable title="Family Details" rows={rows} />;
};

export default ProfileFamilyDetails;
