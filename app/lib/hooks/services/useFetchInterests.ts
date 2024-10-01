import { useState, useEffect, useCallback } from "react";

export enum InterestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

// Assuming this is the interface you are using for Interest
export interface Interest {
  _id: string; // Unique identifier for the interest
  senderId: string; // ID of the user who sent the interest
  receiverId: string; // ID of the user who received the interest
  createdAt: string; // Date when the interest was created
  status: InterestStatus; // Current status of the interest (e.g., Pending, Accepted, Rejected)
}

interface UseFetchInterestsResult {
  receivedInterests: Interest[];
  sentInterests: Interest[];
  loading: boolean;
  error: string | null;
  fetchInterests: () => Promise<void>; // Function to manually fetch data
}

export const useFetchInterests = (
  userId: string | undefined
): UseFetchInterestsResult => {
  const [receivedInterests, setReceivedInterests] = useState<Interest[]>([]);
  const [sentInterests, setSentInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInterests = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch both sent and received interests in one API call
      const response = await fetch(`/api/interests?userId=${userId}`);
      const {
        data: interests,
        error: apiError,
        message,
      } = await response.json();

      if (!apiError) {
        // Filter the interests into sent and received
        const received = interests.filter(
          (interest: Interest) => interest.receiverId === userId
        );
        const sent = interests.filter(
          (interest: Interest) => interest.senderId === userId
        );

        setReceivedInterests(received);
        setSentInterests(sent);
      } else {
        throw new Error(message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  return {
    receivedInterests,
    sentInterests,
    loading,
    error,
    fetchInterests,
  };
};
