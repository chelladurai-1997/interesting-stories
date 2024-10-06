import { useEffect, useState, useRef } from "react";

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

const useProfilesByUserIds = (userIds: string[]) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ref to track the last fetched userIds
  const lastUserIdsRef = useRef<string[]>([]);

  const fetchProfiles = async () => {
    try {
      if (userIds.length === 0) {
        setProfiles([]);
        setLoading(false);
        return;
      }

      // Construct the query string for user IDs
      const apiUrl = `/api/profiles?userIds=${userIds.join(",")}`;

      const response = await fetch(apiUrl);
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

  useEffect(() => {
    if (JSON.stringify(userIds) !== JSON.stringify(lastUserIdsRef.current)) {
      // Update the lastUserIdsRef with the current userIds
      lastUserIdsRef.current = userIds;
      setLoading(true); // Set loading state
      fetchProfiles(); // Fetch profiles when userIds changes
    }
  }, [userIds]); // Re-fetch profiles when userIds change

  return {
    profiles,
    loading,
    error,
  };
};

export default useProfilesByUserIds;
