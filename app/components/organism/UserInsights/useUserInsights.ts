import { useUser } from "@/app/lib/hooks/useUser";
import useProfilesByUserIds from "@/app/lib/hooks/services/useProfilesByUserIds";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import useGetInterestCounts from "@/app/lib/hooks/useGetInterestCounts";
import { formatDateForCards, DateVariation } from "@/app/lib/utils/dateUtils";

const useUserInsights = () => {
  const { userVisits, receivedInterests, sentInterests, userProfile } =
    useUser();
  const { totalAcceptedInterestsSent, totalAcceptedInterestsReceived } =
    useGetInterestCounts();

  const recentVistorsIds = userVisits.map((visit) => visit.visitorId);
  const pendingInterestsReceived = receivedInterests
    .filter((c) => c.status === InterestStatus.PENDING)
    .map((interest) => interest.senderId);

  const { profiles: recentVisitors } = useProfilesByUserIds(recentVistorsIds);
  const { profiles: pendingInterests } = useProfilesByUserIds(
    pendingInterestsReceived
  );

  const sentAccpetedIds = sentInterests
    .filter((c) => c.status === InterestStatus.ACCEPTED)
    .map((interest) => interest.receiverId);

  const receivedAccpetedIds = receivedInterests
    .filter((c) => c.status === InterestStatus.ACCEPTED)
    .map((interest) => interest.senderId);

  const connectedProfileIds = [...receivedAccpetedIds, ...sentAccpetedIds];
  const { profiles: acceptedInterests } =
    useProfilesByUserIds(connectedProfileIds);

  const recentVisitorsCount = userVisits.length;
  const pendingInterestsCount = receivedInterests.filter(
    (c) => c.status === InterestStatus.PENDING
  ).length;

  const connectionsCount =
    totalAcceptedInterestsReceived + totalAcceptedInterestsSent;

  return {
    userProfile,
    recentVisitors,
    pendingInterests,
    acceptedInterests,
    userVisits,
    recentVisitorsCount,
    pendingInterestsCount,
    connectionsCount,
  };
};

export default useUserInsights;
