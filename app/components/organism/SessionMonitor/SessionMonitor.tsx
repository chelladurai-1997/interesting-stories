"use client";

import { useState, useEffect } from "react";
import SessionExpiryPopup from "../SessionExpiryPopup/SessionExpiryPopup";
import { useUser } from "@/app/lib/contexts/UserContext";
import { getExpiryTimeFromToken } from "@/app/lib/utils/getExpiryInfoFromToken";

const SessionMonitor: React.FC = () => {
  const { userProfile, logout } = useUser();
  const [expiryTime, setExpiryTime] = useState<number | null>(null);

  useEffect(() => {
    if (userProfile?.accessToken) {
      setExpiryTime(getExpiryTimeFromToken(userProfile?.accessToken));
    }

    if (userProfile === null) {
      setExpiryTime(null);
    }
  }, [userProfile?.accessToken]);

  return (
    <>
      {typeof expiryTime === "number" && expiryTime > 0 && (
        <SessionExpiryPopup
          expiryTime={expiryTime}
          onContinueBrowsingClick={() => setExpiryTime(null)}
          onSessionExpired={() => {
            setExpiryTime(null);
            logout();
          }}
        />
      )}
    </>
  );
};

export default SessionMonitor;
