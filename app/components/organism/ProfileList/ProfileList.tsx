"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";

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
};

const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("profiles", profiles);
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
  }, []);

  if (loading) {
    return <p>Loading profiles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-screen-xl w-full p-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.name} // Ensure a unique key, e.g., a profile ID
            name={profile.name}
            dob={profile.dob}
            occupation={profile?.educationOccupation?.occupation}
            livingPlace={profile?.familyDetails?.livingPlace}
            height={profile?.personalDetails?.height}
            kulam={profile?.personalDetails?.kulam}
            profileImgUrl={profile?.contactInfo?.profileImgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
