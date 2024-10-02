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
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  dob,
  occupation,
  livingPlace,
  height,
  kulam,
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

  return (
    <div className="w-full min-w-[300px] max-w-[400px] md:max-w-[480px] lg:max-w-[600px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mx-auto p-4 transition-transform duration-300 transform hover:scale-105">
      {/* Profile Image Section */}
      <div className="relative w-full h-64">
        <Link href={"/profiles/" + userId}>
          <Image
            src={profileImgUrl}
            alt={`${name}'s Profile Picture`}
            className="w-full h-full object-cover"
            width={400}
            height={267}
            quality={90}
            loading="lazy"
          />
        </Link>
      </div>

      {/* Profile Details Section */}
      <div className="mt-4">
        {/* Name */}
        <div className="text-2xl font-bold text-gray-900">
          <span>{name}</span>
        </div>

        {/* Age and Height */}
        <p className="text-sm text-gray-800 mb-1">
          {age} years old • {height}
        </p>

        {/* Other Information */}
        <p className="text-sm text-gray-800 mb-4">
          <span className="font-medium text-gray-700">{occupation}, </span>
          <span className="font-medium text-gray-700">{livingPlace}, </span>
          <span className="font-medium text-gray-700">{kulam}</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className={`${
              isInterestSent
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-teal-100 text-teal-600 hover:bg-teal-200"
            } px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out flex-grow`}
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
            href={"/profiles/" + userId}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300 ease-in-out flex-grow text-center"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
