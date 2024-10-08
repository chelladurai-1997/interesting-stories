"use client";
import { useUser } from "@/app/lib/hooks/useUser";
import { getTimeOfDayGreeting } from "@/app/lib/utils/getTimeOfDayGreeting";
import React from "react";

const WelcomeMessage = () => {
  const { userProfile } = useUser(); // Destructure only userProfile from useUser

  if (!userProfile?.userName) return;

  return (
    <div className="bg-white p-8 rounded  text-center">
      <h1 className="text-4xl font-bold text-emerald-600">
        {`Welcome ${userProfile?.userName}, ${getTimeOfDayGreeting()} `}
      </h1>
    </div>
  );
};

export default WelcomeMessage;
