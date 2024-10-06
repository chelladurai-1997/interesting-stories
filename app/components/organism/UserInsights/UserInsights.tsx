"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/lib/hooks/useUser";
import useProfilesByUserIds from "@/app/lib/hooks/services/useProfilesByUserIds";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";

// Define types for props
interface FamilyDetails {
  livingPlace: string;
}

interface ContactInfo {
  profileImgUrl: string;
}

interface VisitorProfile {
  _id: string; // Unique identifier for the visit record
  visitorId: string; // ID of the visitor
  profileOwnerId: string; // ID of the profile owner
  visitedAt: string; // Timestamp of when the visit occurred
  createdAt: string; // Timestamp of when the record was created
  updatedAt: string; // Timestamp of when the record was last updated
  __v: number; // Version key (typically used by Mongoose)
}

interface Visitor {
  userId: string;
  name: string;
  familyDetails: FamilyDetails;
  contactInfo: ContactInfo;
}

const UserInsights: React.FC = () => {
  const { userVisits, receivedInterests, sentInterests, userProfile } =
    useUser();
  const { profiles: recentVisitors } = useProfilesByUserIds(
    userVisits.map((visit: VisitorProfile) => visit.visitorId)
  );
  const { profiles: pendingInterests } = useProfilesByUserIds(
    receivedInterests
      .filter((c) => c.status === InterestStatus.PENDING)
      .map((interest) => interest.senderId)
  );

  // Filter accepted interests based on their status
  const { profiles: acceptedInterests } = useProfilesByUserIds(
    sentInterests
      .filter((c) => c.status === InterestStatus.ACCEPTED)
      .map((interest) => interest.receiverId)
  );

  const [activeTab, setActiveTab] = useState<
    "visitors" | "pending" | "accepted"
  >("pending");

  const renderTabContent = () => {
    switch (activeTab) {
      case "visitors":
        return (
          <section>
            {recentVisitors?.length > 0 ? (
              <ul className="space-y-4">
                {recentVisitors.map((visitor) => {
                  const userVisit = userVisits.find(
                    (visit: VisitorProfile) =>
                      visit.visitorId === visitor.userId
                  );
                  const updatedAt = userVisit?.updatedAt;

                  return (
                    <li
                      key={visitor.userId}
                      className="flex items-start p-4 bg-gray-100 rounded transition duration-300 hover:bg-gray-200"
                    >
                      <img
                        src={
                          visitor.contactInfo.profileImgUrl ??
                          "/default-profile.png"
                        }
                        alt={`${visitor.name ?? "Unknown"}'s profile`}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold">
                          {visitor.name ?? "Unknown"}
                        </h4>
                        <p className="text-gray-600">
                          Lives in{" "}
                          {visitor.familyDetails.livingPlace ??
                            "Location not specified"}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Visited on{" "}
                          {updatedAt
                            ? new Date(updatedAt).toLocaleString()
                            : "Unknown date"}
                        </p>
                        <Link
                          href={`/profiles/${visitor.userId}`}
                          className="text-blue-500 hover:underline mt-2 inline-block"
                        >
                          View Profile
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-600">No recent visitors.</p>
            )}
          </section>
        );

      case "pending":
        return (
          <section>
            {pendingInterests?.length > 0 ? (
              <ul className="space-y-4">
                {pendingInterests.map((interest) => (
                  <li
                    key={interest.userId}
                    className="flex items-start p-4 bg-yellow-100 rounded transition duration-300 hover:bg-yellow-200"
                  >
                    <img
                      src={
                        interest.contactInfo?.profileImgUrl ??
                        "/default-profile.png"
                      }
                      alt={`${interest.name ?? "Unknown"}'s profile`}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold">
                        {interest.name ?? "Unknown"}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        Sent you an interest. 💌
                      </p>
                      <Link
                        href={`/profiles/${interest.userId}`}
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No pending interests.</p>
            )}
          </section>
        );

      case "accepted":
        return (
          <section>
            {acceptedInterests?.length > 0 ? (
              <ul className="space-y-4">
                {acceptedInterests.map((interest) => (
                  <li
                    key={interest.userId}
                    className="flex items-start p-4 bg-green-100 rounded transition duration-300 hover:bg-green-200"
                  >
                    <img
                      src={
                        interest.contactInfo?.profileImgUrl ??
                        "/default-profile.png"
                      }
                      alt={`${interest.name ?? "Unknown"}'s profile`}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold">
                        {interest.name ?? "Unknown"}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        Your interest got accepted! 🎉
                      </p>
                      <Link
                        href={`/profiles/${interest.userId}`}
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No accepted interests. 😄</p>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  if (!userProfile?.userId) return null;
  return (
    <div className="max-w-4xl mx-auto mt-8 md:my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Insights</h2>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === "visitors"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-l-md`}
          onClick={() => setActiveTab("visitors")}
        >
          Visitors{" "}
          <span className="ml-1 bg-red-500 text-white rounded-full px-2">
            {recentVisitors.length}
          </span>
        </button>
        <button
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending{" "}
          <span className="ml-1 bg-red-500 text-white rounded-full px-2">
            {pendingInterests.length}
          </span>
        </button>
        <button
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === "accepted"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-r-md`}
          onClick={() => setActiveTab("accepted")}
        >
          Accepted{" "}
          <span className="ml-1 bg-red-500 text-white rounded-full px-2">
            {acceptedInterests.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="transition-opacity duration-300">
        {renderTabContent()}
      </div>

      {/* Link to View More Information */}
      <div className="mt-6">
        <Link
          href="/profiles"
          className="inline-block text-blue-600 hover:underline"
        >
          Browse Profiles
        </Link>
      </div>
    </div>
  );
};

export default UserInsights;
