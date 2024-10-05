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
    InterestStatus.ALL // Initialize with a valid InterestStatus value
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
        receivedCount={receivedInterests.length}
        sentCount={sentInterests.length}
      />

      <FilterDropdown
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
    ? sentInterests.filter(
        (interest) =>
          activeChildTab === InterestStatus.ALL ||
          interest.status === activeChildTab
      )
    : receivedInterests.filter(
        (interest) =>
          activeChildTab === InterestStatus.ALL ||
          interest.status === activeChildTab
      );
};

// Tabs Component with badge counts
const Tabs: React.FC<{
  activeParentTab: "received" | "sent";
  setActiveParentTab: React.Dispatch<React.SetStateAction<"received" | "sent">>;
  setActiveChildTab: React.Dispatch<React.SetStateAction<InterestStatus>>;
  receivedCount: number;
  sentCount: number;
}> = ({
  activeParentTab,
  setActiveParentTab,
  setActiveChildTab,
  receivedCount,
  sentCount,
}) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        role="tablist"
      >
        {[
          { tab: "received", label: "Received", count: receivedCount },
          { tab: "sent", label: "Sent", count: sentCount },
        ].map(({ tab, label, count }) => (
          <li className="me-2" role="presentation" key={tab}>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeParentTab === tab
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-700 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveParentTab(tab as "received" | "sent");
                setActiveChildTab(InterestStatus.ALL); // Reset to ALL when changing tabs
              }}
              role="tab"
              aria-selected={activeParentTab === tab}
            >
              {label}{" "}
              {count > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  {count}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Filter Dropdown Component
const FilterDropdown: React.FC<{
  activeChildTab: InterestStatus;
  setActiveChildTab: React.Dispatch<React.SetStateAction<InterestStatus>>;
}> = ({ activeChildTab, setActiveChildTab }) => {
  return (
    <div className="mb-4">
      <label htmlFor="status-filter" className="mr-2 text-gray-700">
        Filter by status:
      </label>
      <select
        id="status-filter"
        value={activeChildTab}
        onChange={(e) => setActiveChildTab(e.target.value as InterestStatus)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value={InterestStatus.ALL}>All</option>
        {Object.values(InterestStatus).map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
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
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Profile</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Created At</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterests.map((interest) => (
              <tr key={interest._id}>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() =>
                      handleViewSender(
                        activeParentTab === "received"
                          ? interest.senderId
                          : interest.receiverId
                      )
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {interest.status}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {new Date(interest.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
