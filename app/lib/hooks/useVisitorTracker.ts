import { useEffect, useState, useCallback, useRef } from "react";

export interface VisitorProfile {
  _id: string; // Unique identifier for the visit record
  visitorId: string; // ID of the visitor
  profileOwnerId: string; // ID of the profile owner
  visitedAt: string; // Timestamp of when the visit occurred
  createdAt: string; // Timestamp of when the record was created
  updatedAt: string; // Timestamp of when the record was last updated
  __v: number; // Version key (typically used by Mongoose)
}

export const useVisitorTracker = (loggedInUserId?: string) => {
  const [userVisits, setUserVisits] = useState<VisitorProfile[]>([]); // State to hold visits data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold debounce timeout

  // Function to fetch user visits
  const fetchUserVisits = async () => {
    if (!loggedInUserId) return;

    try {
      const res = await fetch(`/api/recent-visitors?userId=${loggedInUserId}`); // Adjust the endpoint as necessary
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setUserVisits(data?.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to register a visit, takes profileOwnerId as an argument
  const registerVisit = useCallback(
    async (profileOwnerId: string) => {
      if (!loggedInUserId || !profileOwnerId) return;

      // Clear any existing debounce timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set a new debounce timeout
      debounceTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch("/api/recent-visitors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              visitorId: loggedInUserId,
              profileOwnerId: profileOwnerId,
            }),
          });

          if (!res.ok) {
            console.error("Failed to register visit", res.statusText);
            return;
          }

          const data = await res.json();
          console.log("Visit registered:", data);

          // Fetch user visits after successfully registering the visit
          await fetchUserVisits(); // Call to fetch updated user visits
        } catch (error) {
          console.error("Error registering visit:", error);
        }
      }, 1000); // Set debounce time of 1000 ms
    },
    [loggedInUserId]
  ); // Include loggedInUserId in dependencies

  useEffect(() => {
    // Fetch user visits when the hook mounts
    fetchUserVisits();
  }, [loggedInUserId]); // Trigger when loggedInUserId changes

  // Expose registerVisit, userVisits, fetchUserVisits
  return { registerVisit, userVisits, loading, error, fetchUserVisits };
};
