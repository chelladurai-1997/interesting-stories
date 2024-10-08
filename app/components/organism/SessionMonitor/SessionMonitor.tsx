"use client";

import { useState, useEffect } from "react";
import SessionExpiryPopup from "../SessionExpiryPopup/SessionExpiryPopup";
import { getExpiryTimeFromToken } from "@/app/lib/utils/getExpiryInfoFromToken";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/lib/hooks/useUser";

const SessionMonitor: React.FC = () => {
  const { userProfile, logout } = useUser();
  const [expiryTime, setExpiryTime] = useState<number | null>(null);
  const route = useRouter();
  console.log("userProfile?.accessToken", userProfile?.accessToken);
  useEffect(() => {
    if (userProfile?.accessToken) {
      setExpiryTime(getExpiryTimeFromToken(userProfile?.accessToken));
    }

    if (userProfile === null) {
      setExpiryTime(null);
    }
  }, [userProfile?.accessToken]);

  const handleContinueBrowsingClick = () => {
    setExpiryTime(null);
    logout(true);
    route.push("/");
  };

  const handleSessionExpired = () => {
    setExpiryTime(null);
    logout();
  };

  return (
    <>
      {typeof expiryTime === "number" && expiryTime > 0 && (
        <SessionExpiryPopup
          expiryTime={expiryTime}
          onContinueBrowsingClick={handleContinueBrowsingClick}
          onSessionExpired={handleSessionExpired}
        />
      )}
    </>
  );
};

export default SessionMonitor;
