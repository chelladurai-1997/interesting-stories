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
  updatedAt?: string; // Add updatedAt for visit info
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
          return "bg-green-500 text-white hover:bg-green-700"; // Accepted
        case InterestStatus.REJECTED:
          return "bg-red-500 text-white hover:bg-red-700"; // Declined
        default:
          return "bg-yellow-500 text-white hover:bg-yellow-600"; // Pending
      }
    }
    return "bg-blue-100 text-blue-600 hover:bg-blue-200"; // Default for "Send Interest"
  };

  return (
    <li className="flex items-start p-4 bg-gray-100 rounded transition duration-300 hover:bg-gray-200">
      {/* Profile Image */}
      <Image
        src={profileImgUrl ?? "/default-profile.png"}
        alt={`${name}'s profile`}
        width={64} // Provide width (in pixels)
        height={64} // Provide height (in pixels)
        className="w-16 h-16 rounded-full mr-4 object-cover"
      />

      {/* Profile Details */}
      <div className="flex-grow">
        {/* Name */}
        <h4 className="font-semibold text-gray-900">{name ?? "Unknown"}</h4>

        {/* Age, Height, Occupation */}
        <p className="text-sm text-gray-700">
          {age} years old • {height} tall
        </p>

        {/* Living Place */}
        <p className="text-gray-600">
          Lives in {livingPlace ?? "Location not specified"}
        </p>

        {/* Buttons Section */}
        {/* Buttons Section */}
        <div className="flex gap-2 mt-2 items-center">
          {/* Add items-center here */}
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
