"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import SkeletonLoader from "@/app/components/molecules/SkeletonLoader/SkeletonLoader";
import ImageGallery from "@/app/components/organism/ImageGallery/ImageGallery";
import ProfileBasicInfo from "@/app/components/organism/ProfileDetails/ProfileBasicInfo";
import ProfileContactInfo from "@/app/components/organism/ProfileDetails/ProfileContactInfo";
import ProfileEducationOccupation from "@/app/components/organism/ProfileDetails/ProfileEducationOccupation";
import ProfileExpectations from "@/app/components/organism/ProfileDetails/ProfileExpectations";
import ProfileFamilyDetails from "@/app/components/organism/ProfileDetails/ProfileFamilyDetails";
import ProfileHoroscopeInfo from "@/app/components/organism/ProfileDetails/ProfileHoroscopeInfo";
import ProfilePersonalDetails from "@/app/components/organism/ProfileDetails/ProfilePersonalDetails";
import useProfile from "@/app/lib/hooks/services/useProfile";

const Page: React.FC = () => {
  const params = useParams();
  const id = params?.userId as string;

  const [openSection, setOpenSection] = useState<string>("basicInfo");
  const { profile, loading, error } = useProfile(id);

  if (loading) return <SkeletonLoader type="card" />;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 p-6">
      <div className="lg:w-1/4 lg:sticky lg:top-6 lg:space-y-4 mb-4 lg:mb-0">
        <ImageGallery
          images={[profile?.contactInfo?.photo, profile?.horoscopeInfo?.upload]}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
          Profile Details
        </h1>

        <ProfileBasicInfo
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <ProfileContactInfo
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <ProfileEducationOccupation
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <ProfileExpectations
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <ProfileFamilyDetails
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <ProfileHoroscopeInfo
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <ProfilePersonalDetails
          profile={profile}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
      </div>
    </div>
  );
};

export default Page;
