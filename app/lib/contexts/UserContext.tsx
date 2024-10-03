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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = `${baseUrl}/api/auth/refresh-token`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok && data?.accessToken) {
        setUserProfile((prevProfile) => ({
          ...prevProfile!,
          accessToken: data.accessToken,
        }));
        toast.success("Session refreshed successfully!");
      } else {
        handleLogoutError();
      }
    } catch {
      handleLogoutError();
    }
  };

  const handleLogoutError = () => {
    toast.error("Session refresh failed. Please log in again.");
    logout();
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
