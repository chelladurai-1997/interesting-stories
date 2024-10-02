"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import SkeletonLoader from "../../molecules/SkeletonLoader/SkeletonLoader";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { useUser } from "@/app/lib/hooks/useUser";

type Profile = {
  name: string;
  dob: string;
  educationOccupation: {
    education: string;
    occupation: string;
  };
  familyDetails: {
    livingPlace: string;
  };
  personalDetails: {
    height: string;
    kulam: string;
  };
  contactInfo: {
    profileImgUrl: string;
  };
  userId: string;
};

const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { sentInterests, fetchInterests } = useUser();

  // Fetch profiles from the API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const result = await response.json();
        setProfiles(result.data);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfiles();
    fetchInterests();
  }, []);

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
        <p className="text-gray-600"> Please try again later.</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-screen-xl w-full p-4">
        {profiles.map((profile) => {
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
    </div>
  );
};

export default ProfileList;
