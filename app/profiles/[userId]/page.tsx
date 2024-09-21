"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
import Container from "@/app/components/molecules/Container/Container";

const Page: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.userId as string;

  const [openSection, setOpenSection] = useState<string>("basicInfo");
  const { profile, loading, error } = useProfile(id);

  if (loading) return <SkeletonLoader type="card" />;
  if (error) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600">{error} Please try again later.</p>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-4">No profile data found!</h2>
        <p className="text-gray-600">
          It seems like the profile is missing. Please check the user ID and try
          again.
        </p>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col lg:flex-row lg:space-x-4 p-6">
        <div className="lg:w-1/4 lg:sticky lg:top-6 lg:space-y-4 mb-4 lg:mb-0">
          <ImageGallery
            images={[
              profile?.contactInfo?.photo,
              profile?.horoscopeInfo?.upload,
            ]}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
          <button
            onClick={router.back}
            className="mb-4 px-2 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
            aria-label="Go back"
          >
            &larr; {/* This is the left arrow entity */}
          </button>

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
    </Container>
  );
};

export default Page;
