import React from "react";
import Image from "next/image";
import { calculateAge } from "@/app/lib/utils/calculateAge";
import Link from "next/link";
import useSendInterest from "@/app/lib/hooks/services/useSendInterest";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { useUser } from "@/app/lib/hooks/useUser";
import { useRouter } from "next/navigation";

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
  hideSendInterestBtn?: boolean;
  additionalInfo?: string; // Add this property for timestamp
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
  hideSendInterestBtn = false,
  additionalInfo, // Destructure the timestamp prop
}) => {
  const { userProfile } = useUser();
  const router = useRouter();
  const currentUserId = userProfile?.userId;

  // Calculate age
  const age = calculateAge(dob);

  // Use the custom hook to manage sending interest
  const { sendInterest } = useSendInterest(currentUserId);

  const getButtonClasses = () => {
    if (isInterestSent) {
      switch (interestStatus) {
        case InterestStatus.ACCEPTED:
          return "border-green-500 text-green-500 hover:border-green-700"; // Accepted (green border)
        case InterestStatus.REJECTED:
          return "border-red-500 text-red-500 hover:border-red-700"; // Declined (red border)
        default:
          return "border-yellow-500 text-yellow-500 hover:border-yellow-600"; // Pending (yellow border)
      }
    }
    return "border-blue-500 text-blue-500 hover:border-blue-700"; // Default (blue border)
  };

  return (
    <li
      className="flex flex-col p-4 bg-gray-100 rounded hover:bg-gray-200 duration-300"
      onDoubleClick={() => router.push(`/profiles/${userId}`)}
    >
      {/* Row 1: Profile Image and Details */}
      <div className="flex items-center">
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
        <div className="flex-grow ml-4 line-clamp-1">
          {/* Main Content Section */}
          <div className="flex flex-col justify-between">
            {/* Name */}
            <h4 className="font-semibold text-gray-900 line-clamp-1">
              {name ?? "Unknown"}
            </h4>

            {/* Age, Height */}
            <p className="text-sm text-gray-600 line-clamp-1">
              {age} years • {height}
            </p>

            {/* Living Place */}
            <p className="text-gray-700 line-clamp-1">
              Lives in {livingPlace ?? "Location not specified"}
            </p>

            {/* Buttons Section */}
            <div className="flex gap-2 mt-2 items-center">
              {/* Send Interest Button */}
              {!hideSendInterestBtn && (
                <button
                  className={`${getButtonClasses()} px-3 py-1 rounded-md text-sm border transition-colors duration-300 ease-in-out`}
                  onClick={() => sendInterest(userId)}
                  disabled={isInterestSent}
                >
                  {isInterestSent
                    ? interestStatus === InterestStatus.ACCEPTED
                      ? "Accepted"
                      : interestStatus === InterestStatus.REJECTED
                      ? "Declined"
                      : "Interest Sent"
                    : "Like 💖"}
                </button>
              )}

              {/* View Profile Link */}
              <Link
                href={`/profiles/${userId}`}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Additional Information */}
      {additionalInfo && (
        <div className="mt-2">
          {/* Include timestamp or other data here */}
          <p className="text-xs text-gray-500 line-clamp-1">{additionalInfo}</p>
        </div>
      )}
    </li>
  );
};

export default ProfileCard;
