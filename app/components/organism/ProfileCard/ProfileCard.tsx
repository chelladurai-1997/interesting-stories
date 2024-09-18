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
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={"/profiles/" + userId}>
        <Image
          src={profileImgUrl}
          alt={`${name}'s Profile Picture`}
          className="p-8 rounded-t-lg"
          width={400} // Adjust as needed
          height={400} // Adjust as needed
          quality={90}
        />
      </Link>

      <div className="px-5 pb-5">
        <Link href={"/profiles/" + userId}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}, {age} years old
          </h5>
        </Link>

        {/* Occupation, Kulam, Living Place */}
        <p className="mt-2 text-gray-700 dark:text-gray-400">
          <span className="font-medium">{occupation}</span>,{" "}
          <span className="font-medium">{kulam}</span>,{" "}
          <span className="font-medium">{livingPlace}</span>, {height}
        </p>

        {/* Button */}
        <div className="flex items-center justify-between">
          <Link
            href={"/profiles/" + userId}
            className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-800"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
