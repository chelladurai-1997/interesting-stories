import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
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

const useProfileList = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { sentInterests, fetchInterests } = useUser();
  const searchParams = useSearchParams();
  const previousQuery = useRef<string>(""); // To store the previous query string

  const fetchProfiles = async (queryString: string) => {
    try {
      const apiUrl = queryString
        ? `/api/profiles?${queryString}`
        : "/api/profiles";

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
    const queryParams = new URLSearchParams();

    // Capture and conditionally add each query parameter only if it has a value
    const gender = searchParams.get("gender");
    if (gender) queryParams.append("gender", gender);

    const age = searchParams.get("age");
    if (age) queryParams.append("age", age);

    const jaadhagam = searchParams.get("jaadhagam");
    if (jaadhagam) queryParams.append("jaadhagam", jaadhagam);

    const maritalStatus = searchParams.get("marital_status");
    if (maritalStatus) queryParams.append("marital_status", maritalStatus);

    const occupation = searchParams.get("occupation");
    if (occupation) queryParams.append("occupation", occupation);

    const state = searchParams.get("state");
    if (state) queryParams.append("state", state);

    const district = searchParams.get("district");
    if (district) queryParams.append("district", district);

    const currentQuery = queryParams.toString();

    // Only fetch profiles if the query string has changed
    if (
      currentQuery !== previousQuery.current ||
      previousQuery.current === ""
    ) {
      previousQuery.current = currentQuery; // Update the previous query
      setLoading(true); // Set loading state
      fetchProfiles(currentQuery); // Fetch profiles
    }

    fetchInterests(); // Fetch interests regardless of the query
  }, [searchParams, fetchInterests]); // Add fetchInterests to dependencies to avoid linting errors

  const hasSearchParams = Array.from(searchParams.entries()).length > 0;

  return {
    profiles,
    loading,
    error,
    hasSearchParams,
    sentInterests,
    fetchProfiles,
  }; // Expose fetchProfiles
};

export default useProfileList;
