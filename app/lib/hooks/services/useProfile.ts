// hooks/useProfile.ts
import { Profile } from "@/app/profiles/profile.types";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../useUser";

const useProfile = (id: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useUser();

  // Use a ref to track if a fetch is in progress
  const isFetching = useRef<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isFetching.current) return; // Prevent multiple fetches
      isFetching.current = true; // Mark as fetching
      setLoading(true); // Set loading state

      try {
        const response = await fetch("/api/profiles/" + id, {
          headers: { Authorization: `Bearer ${userProfile?.accessToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const result = await response.json();
        setProfile(result.data);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        isFetching.current = false; // Reset fetching state
        setLoading(false); // Reset loading state
      }
    };

    fetchProfile();
  }, [id, userProfile?.accessToken]);

  return { profile, loading, error };
};

export default useProfile;
