// contexts/UserContext.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

// Define the shape of the user profile data
interface UserProfile {
  userId: string;
  userName: string;
}

// Define the shape of the context value
interface UserContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (data: UserProfile) => void;
  logout: () => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }
  }, []);

  const updateUserProfile = (data: UserProfile) => {
    setUserProfile(data);
    localStorage.setItem("userProfile", JSON.stringify(data));
  };

  const logout = () => {
    setUserProfile(null);
    toast.success(`We're sad to see you go. Hope to see you back soon! 🌟`, {
      duration: 5000,
    });

    localStorage.removeItem("userProfile");
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};
