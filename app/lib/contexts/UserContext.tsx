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

// Define the user profile interface
interface UserProfile {
  userId: string;
  userName: string;
  accessToken?: string;
  refreshToken?: string;
}

// Define the context type, including the methods to update user profile, refresh the access token, and log out
interface UserContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (data: UserProfile) => void;
  refreshAccessToken: () => Promise<void>;
  logout: (ignoreNavigation?: boolean) => void;
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

  // On component mount, retrieve stored user profile (if any) from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) setUserProfile(JSON.parse(storedUser));
  }, []);

  // Function to update user profile, which also stores the updated profile in localStorage
  const updateUserProfile = (data: UserProfile) => {
    setUserProfile(data);
    localStorage.setItem("userProfile", JSON.stringify(data));
  };

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async (): Promise<void> => {
    if (!userProfile?.refreshToken) {
      // If no refresh token exists, prompt the user to log in again and log out
      toast.error("No refresh token found. Please log in again.");
      logout();
      return;
    }
    // Build the absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = `${baseUrl}/api/auth/refresh-token`;

    try {
      // Send a request to the server to refresh the access token
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: userProfile.refreshToken }),
      });

      const data = await response.json();

      if (response.ok && data?.accessToken) {
        // If successful, update the user profile with the new access token
        setUserProfile((prevProfile) => ({
          ...prevProfile!,
          accessToken: data.accessToken,
        }));
        // Update localStorage to reflect the new token
        localStorage.setItem(
          "userProfile",
          JSON.stringify({ ...userProfile, accessToken: data.accessToken })
        );
        toast.success("Session refreshed successfully!");
      } else {
        // If the refresh fails, log the user out
        toast.error("Session refresh failed. Please log in again.");
        logout();
      }
    } catch (error) {
      // Handle errors during the token refresh process
      toast.error("Session refresh error. Please log in again.");
      logout();
    }
  };

  // Log out function to clear the user profile and redirect to the login page
  const logout = (ignoreNavigation = false) => {
    setUserProfile(null);
    localStorage.removeItem("userProfile");
    !ignoreNavigation && router.push("/login");
  };

  // Provide the context to the rest of the application
  return (
    <UserContext.Provider
      value={{ userProfile, updateUserProfile, refreshAccessToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
