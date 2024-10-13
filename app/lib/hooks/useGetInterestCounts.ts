import { useUser } from "./useUser";
import { InterestStatus } from "./services/useFetchInterests";

function useGetInterestCounts() {
  const { receivedInterests, sentInterests } = useUser();
  const totalAcceptedInterestsSent = sentInterests.filter(
    (c) => c.status === InterestStatus.ACCEPTED
  ).length;

  const totalAcceptedInterestsReceived = receivedInterests.filter(
    (c) => c.status === InterestStatus.ACCEPTED
  ).length;

  return { totalAcceptedInterestsSent, totalAcceptedInterestsReceived };
}

export default useGetInterestCounts;
