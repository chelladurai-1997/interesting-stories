import { useContext } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";

// Custom hook for user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
