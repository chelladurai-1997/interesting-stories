import React from "react";
import { Profile } from "@/app/profiles/profile.types";
import { formatDate } from "@/app/lib/utils/dateUtils";
import {
  UserIcon,
  CalendarIcon,
  UserGroupIcon,
  UserPlusIcon,
  HeartIcon,
  UsersIcon,
  HomeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfileBasicInfoProps {
  profile: Profile;
}

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ profile }) => {
  const basicInfo = profile.basicInfo ?? {};

  const rows = [
    {
      label: "Name",
      value: basicInfo.name,
      icon: UserIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "Date of Birth",
      value: formatDate(basicInfo.dob || ""),
      icon: CalendarIcon,
      iconColorClass: "text-green-500",
    },
    {
      label: "Gender",
      value: basicInfo.gender,
      icon: UserGroupIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "Profile Created By",
      value: basicInfo.profile_created_by,
      icon: UserPlusIcon,
      iconColorClass: "text-indigo-500",
    },
    {
      label: "Marital Status",
      value: basicInfo.marital_status,
      icon: HeartIcon,
      iconColorClass: "text-red-500",
    },
    {
      label: "Children",
      value: basicInfo.children,
      icon: UsersIcon,
      iconColorClass: "text-pink-500",
    },
    {
      label: "Children Living Status",
      value: basicInfo.children_living_status,
      icon: HomeIcon,
      iconColorClass: "text-teal-500",
    },
    {
      label: "Profile Bio",
      value: basicInfo.profile_bio,
      icon: DocumentTextIcon,
      iconColorClass: "text-gray-500",
    },
  ];

  return <ProfileDetailsTable title="Basic Information" rows={rows} />;
};

export default ProfileBasicInfo;
