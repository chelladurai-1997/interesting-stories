"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { calculateCompletionPercentage } from "../utils/calculateCompletedPercent";
import {
  Interest,
  useFetchInterests,
} from "../hooks/services/useFetchInterests";
import { handleLogout } from "../actions/logout.action";
import { getAccessTokenFromHeaders } from "../actions/authHelper/getAccessTokenFromHeaders";

// Define the user profile interface with completion percentage
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
  completionPercentage?: number; // Add completion percentage
  accessToken?: string; // Remove from localStorage, keep in state only
}

// Define the context type, including the methods to update user profile, refresh the access token, log out, and manage interests
interface UserContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (data: UserProfile) => void;
  refreshAccessToken: () => Promise<void>;
  logout: (ignoreNavigation?: boolean) => void;
  receivedInterests: Interest[]; // Add received interests
  sentInterests: Interest[]; // Add sent interests
  loadingInterests: boolean; // Add loading state for interests
  errorInterests: string | null; // Add error state for interests
  fetchInterests: () => Promise<void>; // Add fetch interests function
}

// Create a context for managing user state
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

// Provider component to wrap the app and provide user state
export const UserProvider = ({ children }: UserProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  // Fetch interests based on user ID
  const userId = userProfile?.userId; // Get userId from the userProfile
  const {
    receivedInterests,
    sentInterests,
    loading: loadingInterests,
    error: errorInterests,
    fetchInterests,
    resetInterests,
  } = useFetchInterests(userId); // Fetch interests using the hook

  // On component mount, retrieve stored user profile (except accessToken) from localStorage and fetch access token from headers
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      const parsedUserProfile = JSON.parse(storedUser);
      setUserProfile(parsedUserProfile); // Set the user profile from local storage

      // Fetch access token from headers
      const fetchAccessToken = async () => {
        const { accessToken, error } = await getAccessTokenFromHeaders();
        console.log("accessToken==>", accessToken);
        if (!error && accessToken) {
          // Update the user profile with the access token
          setUserProfile((prevProfile) => ({
            ...prevProfile!,
            accessToken: accessToken,
          }));
          fetchInterests(); // Fetch interests after setting the access token
        } else {
          logout();
        }
      };

      fetchAccessToken();
    }
  }, []);

  // Function to update user profile, which also stores the updated profile in localStorage (without accessToken)
  const updateUserProfile = (data: UserProfile) => {
    const updatedProfile: UserProfile = {
      ...data,
      completionPercentage: calculateCompletionPercentage(
        data.completedSections
      ) as number,
    };
    setUserProfile(updatedProfile);
    const { accessToken, ...profileWithoutToken } = updatedProfile; // Exclude accessToken
    localStorage.setItem("userProfile", JSON.stringify(profileWithoutToken));
    fetchInterests(); // Fetch interests after updating the profile
  };

  // Function to refresh the access token using the refresh token
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
        // If successful, update the user profile with the new access token
        setUserProfile((prevProfile) => ({
          ...prevProfile!,
          accessToken: data.accessToken,
        }));

        toast.success("Session refreshed successfully!");
      } else {
        toast.error("Session refresh failed. Please log in again.");
        logout();
      }
    } catch (error) {
      toast.error("Session refresh error. Please log in again.");
      logout();
    }
  };

  const logout = async (ignoreNavigation = false) => {
    try {
      const response = await handleLogout();

      if (response.error) {
        throw new Error(response.message);
      }

      setUserProfile(null);
      localStorage.removeItem("userProfile");
      resetInterests?.();

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Provide the context to the rest of the application
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
