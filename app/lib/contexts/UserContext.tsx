"use client";

import { createContext, ReactNode } from "react";
import { useUserProfile, UseUserProfileResult } from "../hooks/useUserProfile";

// Context type
export interface UserContextType extends UseUserProfileResult {}

// Create context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

// Provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const userProfileData = useUserProfile();

  return (
    <UserContext.Provider value={userProfileData}>
      {children}
    </UserContext.Provider>
  );
};
