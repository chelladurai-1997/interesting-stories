"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { useUser } from "@/app/lib/hooks/useUser";

// Type definitions
interface Interest {
  _id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  status: InterestStatus;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { userProfile } = useUser();

  const {
    receivedInterests,
    sentInterests,
    loadingInterests: loading,
    errorInterests: error,
    fetchInterests,
  } = useUser();

  const [activeParentTab, setActiveParentTab] = useState<"received" | "sent">(
    "received"
  );
  const [activeChildTab, setActiveChildTab] = useState<InterestStatus>(
    InterestStatus.PENDING
  );

  const handleViewSender = useCallback(
    (senderId: string) => {
      router.push(`/profiles/${senderId}`);
    },
    [router]
  );

  // Fetch interests whenever the active tabs change
  useEffect(() => {
    fetchInterests();
  }, [activeParentTab, fetchInterests]);

  // Filter interests based on active tabs
  const filteredInterests = getFilteredInterests(
    activeParentTab,
    activeChildTab,
    receivedInterests,
    sentInterests
  );

  return (
    <div className="mx-auto text-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Dashboard</h1>

      <Tabs
        activeParentTab={activeParentTab}
        setActiveParentTab={setActiveParentTab}
        setActiveChildTab={setActiveChildTab}
      />

      <ChildTabs
        activeChildTab={activeChildTab}
        setActiveChildTab={setActiveChildTab}
      />

      <InterestSection
        loading={loading}
        error={error}
        filteredInterests={filteredInterests}
        activeParentTab={activeParentTab}
        handleViewSender={handleViewSender}
      />
    </div>
  );
};

// Helper function to filter interests
const getFilteredInterests = (
  activeParentTab: "received" | "sent",
  activeChildTab: InterestStatus,
  receivedInterests: Interest[],
  sentInterests: Interest[]
): Interest[] => {
  return activeParentTab === "sent"
    ? sentInterests.filter((interest) => interest.status === activeChildTab)
    : receivedInterests.filter(
        (interest) => interest.status === activeChildTab
      );
};

// Tabs Component
const Tabs: React.FC<{
  activeParentTab: "received" | "sent";
  setActiveParentTab: React.Dispatch<React.SetStateAction<"received" | "sent">>;
  setActiveChildTab: React.Dispatch<React.SetStateAction<InterestStatus>>;
}> = ({ activeParentTab, setActiveParentTab, setActiveChildTab }) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        role="tablist"
      >
        {["received", "sent"].map((tab) => (
          <li className="me-2" role="presentation" key={tab}>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeParentTab === tab
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-700 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveParentTab(tab as "received" | "sent");
                setActiveChildTab(InterestStatus.PENDING);
              }}
              role="tab"
              aria-selected={activeParentTab === tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Child Tabs Component
const ChildTabs: React.FC<{
  activeChildTab: InterestStatus;
  setActiveChildTab: React.Dispatch<React.SetStateAction<InterestStatus>>;
}> = ({ activeChildTab, setActiveChildTab }) => {
  return (
    <div className="tabs mb-4 flex justify-center">
      {Object.values(InterestStatus).map((status) => (
        <button
          key={status}
          className={`px-6 py-2 mx-1 rounded-lg transition-colors duration-300 ease-in-out ${
            activeChildTab === status
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveChildTab(status)}
          role="tab"
          aria-selected={activeChildTab === status}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

// Interests Section Component
const InterestSection: React.FC<{
  loading: boolean;
  error: string | null;
  filteredInterests: Interest[];
  activeParentTab: "received" | "sent";
  handleViewSender: (senderId: string) => void;
}> = ({
  loading,
  error,
  filteredInterests,
  activeParentTab,
  handleViewSender,
}) => {
  return (
    <div>
      {loading && <p className="text-lg text-gray-500">Loading interests...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredInterests.length === 0 && (
        <p className="text-lg text-gray-500">
          No interests in {activeParentTab} status.
        </p>
      )}
      {!loading && !error && filteredInterests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterests.map((interest) => (
            <InterestCard
              key={interest._id}
              interest={interest}
              activeParentTab={activeParentTab}
              handleViewSender={handleViewSender}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Interest Card Component
const InterestCard: React.FC<{
  interest: Interest;
  activeParentTab: "received" | "sent";
  handleViewSender: (senderId: string) => void;
}> = ({ interest, activeParentTab, handleViewSender }) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="flex justify-center items-center">
        {/* Placeholder for profile photo */}
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold">
          ?
        </div>
      </div>
      <p className="font-semibold mt-4 text-lg text-gray-800">
        A secret admirer has sent you an interest!
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Someone is intrigued by your profile, but their identity is hidden for
        now. Want to know who it is? Click below!
      </p>
      <p className="text-sm mt-2">
        <span className="text-gray-500">
          {activeParentTab === "received" ? "Received at:" : "Sent at:"}
        </span>{" "}
        <span className="text-blue-600">
          {new Date(interest.createdAt).toLocaleDateString()}
        </span>{" "}
        <span className="text-green-600">
          {new Date(interest.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </p>
      <div className="mt-4">
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={() =>
            handleViewSender(
              activeParentTab === "received"
                ? interest.senderId
                : interest.receiverId
            )
          }
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
