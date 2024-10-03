// hooks/useProfiles.ts
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/app/lib/hooks/useUser";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";

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

  const fetchProfiles = async () => {
    try {
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

      // Construct the full API URL with the query parameters
      const queryString = queryParams.toString();
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
    fetchProfiles();
    fetchInterests();
  }, [searchParams]); // Add searchParams as a dependency to re-fetch on query change

  const hasSearchParams = Array.from(searchParams.entries()).length > 0;

  return { profiles, loading, error, hasSearchParams, sentInterests };
};

export default useProfileList;
