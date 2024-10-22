import React from "react";
import { Profile } from "@/app/profiles/profile.types";
import {
  PhoneIcon,
  ChatBubbleOvalLeftIcon,
  GlobeAltIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  HomeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import ProfileDetailsTable from "../../molecules/ProfileDetailsTable/ProfileDetailTable";

interface ProfileContactInfoProps {
  profile: Profile;
  openSection: string;
  setOpenSection: (section: string) => void;
}

const ProfileContactInfo: React.FC<ProfileContactInfoProps> = ({
  profile,
  openSection,
  setOpenSection,
}) => {
  const contactInfo = profile.contactInfo ?? {};

  const rows = [
    {
      label: "Mobile",
      value: contactInfo.mobile,
      icon: PhoneIcon,
      iconColorClass: "text-blue-500",
    },
    {
      label: "WhatsApp",
      value: contactInfo.whatsapp,
      icon: ChatBubbleOvalLeftIcon,
      iconColorClass: "text-green-500",
    },
    {
      label: "Country",
      value: contactInfo.country,
      icon: GlobeAltIcon,
      iconColorClass: "text-yellow-500",
    },
    {
      label: "State",
      value: contactInfo.state,
      icon: MapPinIcon,
      iconColorClass: "text-indigo-500",
    },
    {
      label: "District",
      value: contactInfo.district,
      icon: BuildingLibraryIcon,
      iconColorClass: "text-purple-500",
    },
    {
      label: "Address",
      value: contactInfo.address,
      icon: HomeIcon,
      iconColorClass: "text-pink-500",
    },
    {
      label: "Pin Code",
      value: contactInfo.pin_code,
      icon: IdentificationIcon,
      iconColorClass: "text-teal-500",
    },
  ];

  return <ProfileDetailsTable title="Contact Information" rows={rows} />;
};

export default ProfileContactInfo;
