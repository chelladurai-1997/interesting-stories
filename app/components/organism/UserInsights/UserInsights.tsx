"use client";
import React from "react";
import { useUser } from "@/app/lib/hooks/useUser";
import useProfilesByUserIds from "@/app/lib/hooks/services/useProfilesByUserIds";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import OverviewSection from "../OverviewSection/OverviewSection";
import ProfileCard from "../ProfileCard/ProfileCard"; // Import ProfileCard
import { DateVariation, formatDateForCards } from "@/app/lib/utils/dateUtils";
import Chat from "../../molecules/Chat/MyChat";

const UserInsights: React.FC = () => {
  const { userVisits, receivedInterests, sentInterests, userProfile } =
    useUser();
  const { profiles: recentVisitors } = useProfilesByUserIds(
    userVisits.map((visit) => visit.visitorId)
  );
  const { profiles: pendingInterests } = useProfilesByUserIds(
    receivedInterests
      .filter((c) => c.status === InterestStatus.PENDING)
      .map((interest) => interest.senderId)
  );
  const { profiles: acceptedInterests } = useProfilesByUserIds(
    sentInterests
      .filter((c) => c.status === InterestStatus.ACCEPTED)
      .map((interest) => interest.receiverId)
  );

  if (!userProfile?.userId) return null;

  const recentVisitorsCount = userVisits.length;
  const pendingInterestsCount = receivedInterests.filter(
    (c) => c.status === InterestStatus.PENDING
  ).length;
  const acceptedInterestsCount = sentInterests.filter(
    (c) => c.status === InterestStatus.ACCEPTED
  ).length;

  return (
    <div className="max-w-4xl mx-auto md:my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Insights</h2>

      {/* Overview Section */}
      <OverviewSection
        recentVisitorsCount={recentVisitorsCount}
        pendingInterestsCount={pendingInterestsCount}
        acceptedInterestsCount={acceptedInterestsCount}
      />

      {/* Accepted Interests Section */}
      {acceptedInterestsCount > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold pb-4">
            {acceptedInterestsCount} member
            {acceptedInterestsCount > 1 ? "s" : ""} accepted your interest
          </h3>
          {acceptedInterests?.length > 0 ? (
            <ul className="space-y-4">
              {acceptedInterests.map((interest) => (
                <ProfileCard
                  key={interest.userId}
                  name={interest.name ?? "Unknown"}
                  dob={interest?.dob ?? ""}
                  occupation={""}
                  livingPlace={interest.familyDetails?.livingPlace ?? "Unknown"}
                  height={interest.personalDetails?.height ?? ""}
                  kulam={interest.personalDetails?.kulam ?? ""}
                  profileImgUrl={
                    interest.contactInfo?.profileImgUrl ??
                    "/default-profile.png"
                  }
                  userId={interest.userId}
                  interestStatus={InterestStatus.ACCEPTED}
                  isInterestSent={true}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No accepted interests. 😄</p>
          )}
        </section>
      )}

      {/* Pending Interests Section */}
      {pendingInterestsCount > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold pb-4">
            {pendingInterestsCount} member{pendingInterestsCount > 1 ? "s" : ""}{" "}
            awaiting your response
          </h3>
          {pendingInterests?.length > 0 ? (
            <ul className="space-y-4">
              {pendingInterests.map((interest) => (
                <ProfileCard
                  key={interest.userId}
                  name={interest.name ?? "Unknown"}
                  dob={interest.dob ?? ""}
                  occupation={""}
                  livingPlace={interest.familyDetails?.livingPlace ?? "Unknown"}
                  height={interest.personalDetails?.height ?? ""}
                  kulam={interest.personalDetails?.kulam ?? ""}
                  profileImgUrl={interest.contactInfo?.profileImgUrl}
                  userId={interest.userId}
                  interestStatus={InterestStatus.PENDING}
                  isInterestSent={false}
                  hideSendInterestBtn
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No pending interests.</p>
          )}
        </section>
      )}

      {/* Recent Visitors Section */}
      {recentVisitorsCount > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold pb-4">
            {recentVisitorsCount} member{recentVisitorsCount > 1 ? "s" : ""}{" "}
            visited your profile
          </h3>
          {recentVisitors?.length > 0 ? (
            <ul className="space-y-4">
              {recentVisitors.map((visitor) => {
                const userVisit = userVisits.find(
                  (visit) => visit.visitorId === visitor.userId
                );
                const updatedAt = userVisit?.updatedAt;

                return (
                  <ProfileCard
                    occupation=""
                    key={visitor.userId}
                    name={visitor.name ?? "Unknown"}
                    dob={visitor.dob ?? ""}
                    livingPlace={
                      visitor.familyDetails?.livingPlace ?? "Unknown"
                    }
                    height={visitor.personalDetails.height}
                    kulam={""}
                    profileImgUrl={visitor.contactInfo?.profileImgUrl}
                    userId={visitor.userId}
                    interestStatus={""}
                    isInterestSent={false}
                    additionalInfo={
                      updatedAt
                        ? formatDateForCards(
                            new Date(updatedAt),
                            DateVariation.Visited
                          )
                        : ""
                    }
                    hideSendInterestBtn
                  />
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No recent visitors.</p>
          )}
        </section>
      )}
      <Chat />
    </div>
  );
};

export default UserInsights;
