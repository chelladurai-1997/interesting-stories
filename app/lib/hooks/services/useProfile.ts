// hooks/useProfile.ts
import { Profile } from "@/app/profiles/profile.types";
import { useState, useEffect } from "react";
import { useUser } from "../useUser";

const useProfile = (id: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profiles/" + id, {
          headers: { Authorization: `Bearer ${userProfile?.accessToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const result = await response.json();
        setProfile(result.data);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, userProfile?.accessToken]);

  return { profile, loading, error };
};

export default useProfile;
