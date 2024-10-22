import React from "react";
import { Profile } from "@/app/profiles/profile.types";
import {
  SunIcon,
  MoonIcon,
  FireIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfileHoroscopeInfoProps {
  profile: Profile;
}

const ProfileHoroscopeInfo: React.FC<ProfileHoroscopeInfoProps> = ({
  profile,
}) => {
  const horoscopeInfo = profile.horoscopeInfo ?? {};

  const rows = [
    {
      label: "Raasi",
      value: horoscopeInfo.raasi,
      icon: SunIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "Nachathiram",
      value: horoscopeInfo.nachathiram,
      icon: MoonIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "Lagnam",
      value: horoscopeInfo.lagnam,
      icon: FireIcon,
      iconColorClass: "text-red-500",
    },
    {
      label: "Dhisai Irupu",
      value: horoscopeInfo.dhisaiIrupu,
      icon: ArrowPathIcon,
      iconColorClass: "text-indigo-500",
    },
    {
      label: "Dhosam",
      value: horoscopeInfo.dhosam,
      icon: ExclamationCircleIcon,
      iconColorClass: "text-purple-500",
    },
  ];

  return <ProfileDetailsTable title="Horoscope Info" rows={rows} />;
};

export default ProfileHoroscopeInfo;
