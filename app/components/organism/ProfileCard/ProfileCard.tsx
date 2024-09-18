import React from "react";
import Image from "next/image";
import { calculateAge } from "@/app/lib/utils/calculateAge";
import Link from "next/link";

type ProfileCardProps = {
  name: string;
  dob: string;
  occupation: string;
  livingPlace: string;
  height: string;
  kulam: string;
  profileImgUrl: string;
  userId: string;
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
}) => {
  // Calculate age
  const age = calculateAge(dob);

  return (
    <Link href={"/profiles/" + userId}>
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out mx-auto">
        {/* Profile Image Section */}
        <div className="h-48 flex-none relative">
          <Image
            src={profileImgUrl}
            alt={`${name}'s Profile Picture`}
            className="w-full h-full object-cover"
            width={400}
            height={400}
            quality={90}
          />
        </div>

        {/* Profile Details Section */}
        <div className="p-4 flex flex-col justify-between">
          {/* Name with 'View more' */}
          <div className="flex items-center text-xl font-bold text-gray-800 overflow-hidden">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
              {name}
            </span>
            <Link href={"/profiles/" + userId}>
              <span className="text-teal-600 underline ml-2 whitespace-nowrap text-base">
                View more
              </span>
            </Link>
          </div>

          {/* Age and Height */}
          <p className="text-sm text-teal-600">
            {age} years old, {height}
          </p>

          {/* Other Information (comma-separated and different colors) */}
          <p className="text-sm text-gray-700">
            <span className="font-medium text-teal-500">{occupation}</span>,{" "}
            <span className="font-medium text-teal-500">{kulam}</span>,{" "}
            <span className="font-medium text-teal-500">{livingPlace}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
