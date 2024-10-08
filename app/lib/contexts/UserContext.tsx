"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { calculateCompletionPercentage } from "../utils/calculateCompletedPercent";
import {
  Interest,
  useFetchInterests,
} from "../hooks/services/useFetchInterests";
import { handleLogout } from "../actions/logout.action";
import { getAccessTokenFromHeaders } from "../actions/authHelper/getAccessTokenFromHeaders";
import { useVisitorTracker, VisitorProfile } from "../hooks/useVisitorTracker"; // Import the hook
import { refreshAccessTokenAction } from "../actions/refreshToken.action";

// User profile interface
interface UserProfile {
  userId: string;
  userName: string;
  completedSections: {
    basicInfo: boolean;
    personalDetails: boolean;
    educationOccupation: boolean;
    horoscope: boolean;
    expectation: boolean;
    familyDetails: boolean;
    contactDetails: boolean;
  };
  completionPercentage?: number;
  accessToken?: string;
}

// Context type
export interface UserContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (data: UserProfile) => void;
  refreshAccessToken: () => Promise<void>;
  logout: (ignoreNavigation?: boolean) => void;
  receivedInterests: Interest[];
  sentInterests: Interest[];
  loadingInterests: boolean;
  errorInterests: string | null;
  fetchInterests: () => Promise<void>;
  registerVisit: (profileOwnerId: string) => Promise<void>; // Add registerVisit
  userVisits: VisitorProfile[] | []; // Add userVisits
  loadingUserVisits: boolean; // Loading state for user visits
  errorUserVisits: string | null; // Error state for user visits
}

// Create context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

// Provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const userId = userProfile?.userId;
  const {
    receivedInterests,
    sentInterests,
    loading: loadingInterests,
    error: errorInterests,
    fetchInterests,
    resetInterests,
  } = useFetchInterests(userId);

  // Use the visitor tracker hook
  const {
    registerVisit,
    userVisits,
    loading: loadingUserVisits,
    error: errorUserVisits,
  } = useVisitorTracker(userId); // Pass loggedInUserId from userProfile

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      const parsedUserProfile = JSON.parse(storedUser);
      setUserProfile(parsedUserProfile);
      fetchAccessToken();
    }
  }, []);

  const fetchAccessToken = async () => {
    const { accessToken, error } = await getAccessTokenFromHeaders();

    if (error || !accessToken) {
      logout();
      return;
    }

    setUserProfile((prevProfile) => ({
      ...prevProfile!,
      accessToken: accessToken,
    }));
    fetchInterests();
  };

  const updateUserProfile = (data: UserProfile) => {
    const updatedProfile: UserProfile = {
      ...data,
      completionPercentage: calculateCompletionPercentage(
        data.completedSections
      ) as number,
    };
    setUserProfile(updatedProfile);
    const { accessToken, ...profileWithoutToken } = updatedProfile;
    localStorage.setItem("userProfile", JSON.stringify(profileWithoutToken));
    fetchInterests();
  };

  const refreshAccessToken = async (): Promise<void> => {
    try {
      const data = await refreshAccessTokenAction();

      if (data?.error) {
        handleLogoutError();
      } else {
        setUserProfile((prevProfile) => ({
          ...prevProfile!,
          accessToken: data.accessToken,
        }));
        toast.success("Session refreshed successfully!");
      }
    } catch {
      handleLogoutError();
    }
  };

  const handleLogoutError = () => {
    toast.error("Session refresh failed. Please log in again.");
    logout(true);
  };

  const logout = async (ignoreNavigation = false) => {
    try {
      const response = await handleLogout();
      if (response.error) throw new Error(response.message);

      setUserProfile(null);
      localStorage.removeItem("userProfile");
      localStorage.removeItem("hasVisited");
      resetInterests?.();

      if (!ignoreNavigation) {
        router.push("/login");
      }

      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        refreshAccessToken,
        logout,
        receivedInterests,
        sentInterests,
        loadingInterests,
        errorInterests,
        fetchInterests,
        registerVisit, // Pass down the registerVisit function
        userVisits, // Pass down userVisits
        loadingUserVisits, // Pass down loading state for user visits
        errorUserVisits, // Pass down error state for user visits
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
