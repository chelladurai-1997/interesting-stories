import React from "react";
import Image from "next/image";
import { calculateAge } from "@/app/lib/utils/calculateAge";
import Link from "next/link";
import useSendInterest from "@/app/lib/hooks/services/useSendInterest";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { useUser } from "@/app/lib/hooks/useUser";

type ProfileCardProps = {
  name: string;
  dob: string;
  occupation: string;
  livingPlace: string;
  height: string;
  kulam: string;
  profileImgUrl: string;
  userId: string;
  interestStatus: string;
  isInterestSent: boolean;
  updatedAt?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  dob,
  livingPlace,
  height,
  profileImgUrl,
  userId,
  isInterestSent,
  interestStatus,
}) => {
  const { userProfile } = useUser();
  const currentUserId = userProfile?.userId;

  // Calculate age
  const age = calculateAge(dob);

  // Use the custom hook to manage sending interest
  const { sendInterest } = useSendInterest(currentUserId);

  const getButtonClasses = () => {
    if (isInterestSent) {
      switch (interestStatus) {
        case InterestStatus.ACCEPTED:
          return "bg-green-500 text-white hover:bg-green-700"; // Accepted (green)
        case InterestStatus.REJECTED:
          return "bg-red-500 text-white hover:bg-red-700"; // Declined (red)
        default:
          return "bg-yellow-500 text-white hover:bg-yellow-600"; // Pending (yellow)
      }
    }
    return "bg-blue-100 text-blue-600 hover:bg-blue-200"; // Default (blue)
  };

  return (
    <li className="flex items-center p-4 bg-gray-100 rounded  hover:bg-gray-200  duration-300">
      {/* Profile Image */}
      <div className="flex-shrink-0 w-24 h-24 relative rounded overflow-hidden">
        <Image
          src={profileImgUrl}
          alt={`${name}'s profile`}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-grow ml-4 flex flex-col justify-between">
        {/* Name */}
        <h4 className="font-semibold text-gray-900">{name ?? "Unknown"}</h4>

        {/* Age, Height */}
        <p className="text-sm text-gray-600">
          {age} years old • {height}
        </p>

        {/* Living Place */}
        <p className="text-gray-700">
          Lives in {livingPlace ?? "Location not specified"}
        </p>

        {/* Buttons Section */}
        <div className="flex gap-2 mt-2 items-center">
          <button
            className={`${getButtonClasses()} px-3 py-1 rounded-md text-sm transition-colors duration-300 ease-in-out`}
            onClick={() => sendInterest(userId)}
            disabled={isInterestSent}
          >
            {isInterestSent
              ? interestStatus === InterestStatus.ACCEPTED
                ? "Accepted"
                : interestStatus === InterestStatus.REJECTED
                ? "Declined"
                : "Interest Sent"
              : "Send Interest"}
          </button>
          <Link
            href={`/profiles/${userId}`}
            className="text-blue-500 hover:underline text-sm"
          >
            View Profile
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProfileCard;
