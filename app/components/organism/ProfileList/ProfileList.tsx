"use client";
import React, { useEffect, useState } from "react"; // Import useState and useEffect
import { useRouter } from "next/navigation";
import ProfileCard from "../ProfileCard/ProfileCard";
import SkeletonLoader from "../../molecules/SkeletonLoader/SkeletonLoader";
import FilterModal from "../FilterModal/FilterModal";
import useProfileList from "./useProfileList";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { useUser } from "@/app/lib/hooks/useUser";

const ProfileList: React.FC = () => {
  const { profiles, loading, error, hasSearchParams, sentInterests } =
    useProfileList();
  const { userProfile } = useUser();
  const router = useRouter(); // For navigation

  // State to manage the opacity of the reset button
  const [showResetButton, setShowResetButton] = useState(false);

  useEffect(() => {
    // Set button visibility based on hasSearchParams
    if (hasSearchParams) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }
  }, [hasSearchParams]);

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="card" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-4">Uh-oh! No Profiles Found!</h2>
        <p className="text-gray-600">
          It seems like the profiles are on a coffee break. ☕
          <br />
          Don’t worry, check back later to meet some awesome people!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mx-auto">
      <div className="max-w-screen-xl w-full p-4 ">
        <h1 className="text-4xl font-bold mb-4 text-teal-600 text-center">
          Profiles
        </h1>
        <div className="text-right mb-4">
          {/* Conditionally render the reset button with transition effects */}
          {showResetButton && (
            <button
              className={`text-teal-600 underline hover:text-teal-800 transition-opacity duration-300 ${
                showResetButton ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => {
                router.push("/profiles"); // Reset filters by navigating to /profiles
              }}
              style={{ transition: "opacity 0.3s ease-in-out" }}
            >
              Reset Filters
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profiles.map((profile) => {
            //Don't show own profile
            if (profile?.userId === userProfile?.userId) {
              return <></>;
            }
            const isInterestSent = sentInterests.some(
              (interest) => interest.receiverId === profile?.userId
            );
            const interestStatus =
              sentInterests.find(
                (interest) => interest.receiverId === profile?.userId
              )?.status ?? InterestStatus.PENDING;

            return (
              <ProfileCard
                key={profile.userId} // Use userId for unique key
                name={profile.name}
                dob={profile.dob}
                occupation={profile.educationOccupation?.occupation}
                livingPlace={profile.familyDetails?.livingPlace}
                height={profile.personalDetails?.height}
                kulam={profile.personalDetails?.kulam}
                profileImgUrl={profile.contactInfo?.profileImgUrl}
                userId={profile.userId}
                isInterestSent={isInterestSent}
                interestStatus={interestStatus}
              />
            );
          })}
        </div>
        <FilterModal />
      </div>
    </div>
  );
};

export default ProfileList;
