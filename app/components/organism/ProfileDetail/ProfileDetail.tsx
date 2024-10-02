"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SkeletonLoader from "@/app/components/molecules/SkeletonLoader/SkeletonLoader";
import ImageGallery from "@/app/components/organism/ImageGallery/ImageGallery";
import ProfileBasicInfo from "@/app/components/organism/ProfileDetails/ProfileBasicInfo";
import ProfileContactInfo from "@/app/components/organism/ProfileDetails/ProfileContactInfo";
import ProfileEducationOccupation from "@/app/components/organism/ProfileDetails/ProfileEducationOccupation";
import ProfileExpectations from "@/app/components/organism/ProfileDetails/ProfileExpectations";
import ProfileFamilyDetails from "@/app/components/organism/ProfileDetails/ProfileFamilyDetails";
import ProfileHoroscopeInfo from "@/app/components/organism/ProfileDetails/ProfileHoroscopeInfo";
import ProfilePersonalDetails from "@/app/components/organism/ProfileDetails/ProfilePersonalDetails";
import useProfile from "@/app/lib/hooks/services/useProfile";
import useSendInterest from "@/app/lib/hooks/services/useSendInterest";
import Container from "@/app/components/molecules/Container/Container";
import Header from "@/app/components/organism/Header/Header";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { useUser } from "@/app/lib/hooks/useUser";

const ProfileDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { userProfile, receivedInterests, sentInterests, fetchInterests } =
    useUser();
  const id = params?.userId as string;

  const [openSection, setOpenSection] = useState<string>("basicInfo");
  const { profile, loading, error } = useProfile(id);
  const { sendInterest } = useSendInterest(userProfile?.userId);

  useEffect(() => {
    fetchInterests?.();
  }, []);

  // Check for any received interests for this user
  const currentInterest = receivedInterests.find(
    (interest) => interest.senderId === id
  );

  // Check for any sent interests for this user
  const currentSentInterest = sentInterests.find(
    (interest) => interest.receiverId === id
  );

  const interestReceivedAt = currentInterest?.createdAt;

  const handleSendInterest = () => {
    sendInterest(id); // Send interest to the user
  };

  const handleAcceptInterest = () => {
    if (currentInterest) {
      sendInterest(currentInterest.senderId, currentInterest._id, "accepted");
    }
  };

  const handleDeclineInterest = () => {
    if (currentInterest) {
      sendInterest(currentInterest.senderId, currentInterest._id, "declined");
    }
  };

  // Format the received date
  const formatReceivedDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    return `Received Interest on: ${formattedDate}`;
  };

  const renderInterestButtons = () => {
    if (currentInterest) {
      if (currentInterest.status === "pending") {
        return (
          <div className="flex space-x-2 mb-2">
            <button
              onClick={handleDeclineInterest}
              className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
              aria-label="Decline interest"
            >
              Decline
            </button>
            <button
              onClick={handleAcceptInterest}
              className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600"
              aria-label="Accept interest"
            >
              Accept
            </button>
          </div>
        );
      } else {
        return (
          <p className="text-gray-500 text-sm text-center">
            {currentInterest.status === InterestStatus.ACCEPTED
              ? `You have accepted the interest from ${profile?.basicInfo?.name}.`
              : currentInterest.status === InterestStatus.REJECTED
              ? `You have declined the interest from ${profile?.basicInfo?.name}.`
              : `The interest from ${profile?.basicInfo?.name} is pending.`}

            {formatReceivedDate(interestReceivedAt!)}
          </p>
        );
      }
    } else if (currentSentInterest) {
      return (
        <p className="text-gray-500 text-sm text-center">
          {currentSentInterest.status === InterestStatus.ACCEPTED
            ? `${profile?.basicInfo?.name} has accepted your interest.`
            : currentSentInterest.status === InterestStatus.REJECTED
            ? `${profile?.basicInfo?.name} has declined your interest.`
            : `Your interest to ${profile?.basicInfo?.name} is pending.`}
        </p>
      );
    } else {
      return (
        <button
          onClick={handleSendInterest}
          className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
          aria-label="Send interest"
        >
          Send Interest
        </button>
      );
    }
  };

  const renderContent = () => {
    if (loading) return <SkeletonLoader type="card" />;
    if (error) {
      return (
        <div className="text-center p-6">
          <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-gray-600"> Please try again later.</p>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="text-center p-6">
          <h2 className="text-xl font-bold mb-4">No profile data found!</h2>
          <p className="text-gray-600">
            It seems like the profile is missing. Please check the user ID and
            try again.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row lg:space-x-4 p-6">
        <div className="lg:w-1/4 lg:sticky lg:top-6 lg:space-y-4 mb-4 lg:mb-0 relative">
          <div className="max-h-96 overflow-hidden">
            <ImageGallery
              images={[
                profile?.contactInfo?.photo,
                profile?.horoscopeInfo?.upload,
              ]}
            />
          </div>

          {/* Action buttons and received date */}
          <div className="flex flex-col items-center mt-4">
            {renderInterestButtons()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
          <button
            onClick={router.back}
            className="mb-4 px-2 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
            aria-label="Go back"
          >
            &larr; {/* This is the left arrow entity */}
          </button>

          <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
            Profile Details
          </h1>

          <ProfileBasicInfo
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
          <ProfileContactInfo
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
          <ProfileEducationOccupation
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
          <ProfileExpectations
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
          <ProfileFamilyDetails
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
          <ProfileHoroscopeInfo
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
          <ProfilePersonalDetails
            profile={profile}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
        </div>
      </div>
    );
  };

  return <Container>{renderContent()}</Container>;
};

export default ProfileDetail;
