import React from "react";
import Image from "next/image";
import { calculateAge } from "@/app/lib/utils/calculateAge";
import Link from "next/link";
import toast from "react-hot-toast";

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
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mx-auto">
      {/* Profile Image Section */}
      <div className="relative w-full h-48">
        <Link href={"/profiles/" + userId}>
          <Image
            src={profileImgUrl}
            alt={`${name}'s Profile Picture`}
            className="w-full h-full object-cover"
            width={400}
            height={267} // Adjusted height for a good aspect ratio
            quality={90}
            loading="lazy"
          />
        </Link>
      </div>

      {/* Profile Details Section */}
      <div className="p-3">
        {/* Name */}
        <div className="text-xl font-bold text-gray-900 ">
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
            className="bg-teal-100 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-200 transition-colors duration-300 ease-in-out flex-grow"
            onClick={() => {
              toast.success(
                `Hey! We're thrilled to have you here. Stay tuned, exciting features are coming soon!`
              );
            }}
          >
            Send Interest
          </button>
          <Link
            href={"/profiles/" + userId}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300 ease-in-out flex-grow text-center"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
