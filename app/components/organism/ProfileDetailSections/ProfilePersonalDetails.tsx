import React from "react";
import {
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  StarIcon,
  ArrowsUpDownIcon,
  UserCircleIcon,
  ScaleIcon,
  HeartIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { Profile } from "@/app/profiles/profile.types";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfilePersonalDetailsProps {
  profile: Profile;
}

const ProfilePersonalDetails: React.FC<ProfilePersonalDetailsProps> = ({
  profile,
}) => {
  const personalDetails = profile.personalDetails ?? {};

  const rows = [
    {
      label: "Religion",
      value: personalDetails.religion,
      icon: GlobeAltIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "Caste",
      value: personalDetails.caste,
      icon: AdjustmentsHorizontalIcon,
      iconColorClass: "text-green-500",
    },
    {
      label: "Kulam",
      value: personalDetails.kulam,
      icon: SparklesIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "Kula Deivam",
      value: personalDetails.kula_deivam,
      icon: StarIcon,
      iconColorClass: "text-indigo-500",
    },
    {
      label: "Height",
      value: personalDetails.height,
      icon: ArrowsUpDownIcon,
      iconColorClass: "text-purple-500",
    },
    {
      label: "Complexion",
      value: personalDetails.complexion,
      icon: UserCircleIcon,
      iconColorClass: "text-pink-500",
    },
    {
      label: "Weight",
      value: personalDetails.weight,
      icon: ScaleIcon,
      iconColorClass: "text-teal-500",
    },
    {
      label: "Blood Group",
      value: personalDetails.blood_group,
      icon: HeartIcon,
      iconColorClass: "text-gray-500",
    },
    {
      label: "Physically Challenged",
      value: personalDetails.physically_challenged ? "Yes" : "No",
      icon: ShieldExclamationIcon,
      iconColorClass: "text-red-500",
    },
    {
      label: "Physical Challenge Details",
      value: personalDetails.physical_challenge_details,
      icon: InformationCircleIcon,
      iconColorClass: "text-orange-500",
    },
  ];

  return <ProfileDetailsTable title="Personal Details" rows={rows} />;
};

export default ProfilePersonalDetails;
