import { useState, useEffect, useCallback } from "react";

export enum InterestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  ALL = "all",
}

export interface Interest {
  _id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  status: InterestStatus;
}

interface UseFetchInterestsResult {
  receivedInterests: Interest[];
  sentInterests: Interest[];
  loading: boolean;
  error: string | null;
  fetchInterests: () => Promise<void>;
  resetInterests: () => void; // New reset function to clear the state
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
      const response = await fetch(`/api/interests?userId=${userId}`);
      const {
        data: interests,
        error: apiError,
        message,
      } = await response.json();

      if (!apiError) {
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

  // Function to reset the state
  const resetInterests = () => {
    setReceivedInterests([]);
    setSentInterests([]);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  return {
    receivedInterests,
    sentInterests,
    loading,
    error,
    fetchInterests,
    resetInterests, // Expose the reset function
  };
};
