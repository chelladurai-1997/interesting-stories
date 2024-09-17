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
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out mx-auto">
      {/* Profile Image Section */}
      <div className="h-48 flex-none relative">
        <Image
          src={profileImgUrl}
          alt={`${name}'s Profile Picture`}
          className="w-full h-full object-cover"
          width={400} // Adjusted width for better scaling
          height={400} // Adjusted height for better scaling
          quality={90}
        />
      </div>

      {/* Profile Details Section */}
      <div className="p-4 flex flex-col justify-between">
        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>

        {/* Age and Height */}
        <p className="text-sm text-teal-600">
          {age} years old, {height}
        </p>

        {/* Other Information (comma-separated and different colors) */}
        <p className="text-sm mt-2 text-gray-700">
          <span className="font-medium text-teal-500">{occupation}</span>,{" "}
          <span className="font-medium text-teal-500">{kulam}</span>,{" "}
          <span className="font-medium text-teal-500">{livingPlace}</span>
        </p>

        {/* Optional Button/Call to Action */}
        <div className="mt-4 text-center">
          <Link href={"/profiles/" + userId}>
            <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-300">
              View Full Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
