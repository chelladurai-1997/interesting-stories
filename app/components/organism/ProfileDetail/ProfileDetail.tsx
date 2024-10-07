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
  const {
    userProfile,
    receivedInterests,
    sentInterests,
    fetchInterests,
    registerVisit,
  } = useUser();
  const id = params?.userId as string;
  const currentInterest = receivedInterests.find(
    (interest) => interest.senderId === id
  );

  const currentSentInterest = sentInterests.find(
    (interest) => interest.receiverId === id
  );

  const [openSection, setOpenSection] = useState<string>(
    currentInterest?.status === InterestStatus.ACCEPTED
      ? "contactInfo"
      : "basicInfo"
  );
  const { profile, loading, error } = useProfile(id);
  const { sendInterest } = useSendInterest(userProfile?.userId);

  useEffect(() => {
    fetchInterests?.();
    if (params?.userId && typeof params?.userId === "string") {
      registerVisit(params?.userId);
    }
  }, []);

  const interestReceivedAt = currentInterest?.createdAt;

  const handleSendInterest = () => {
    sendInterest(id); // Send interest to the user
  };

  const handleAcceptInterest = () => {
    if (currentInterest) {
      sendInterest(
        currentInterest.senderId,
        currentInterest._id,
        InterestStatus.ACCEPTED
      );
    }
  };

  const handleDeclineInterest = () => {
    if (currentInterest) {
      sendInterest(
        currentInterest.senderId,
        currentInterest._id,
        InterestStatus.REJECTED
      );
    }
  };

  const formatReceivedDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    return formattedDate; // Return the formatted date string for display
  };

  const renderInterestButtons = () => {
    const currentInterestStatus = currentInterest?.status;
    const currentSentInterestStatus = currentSentInterest?.status;

    // If interest is received and is pending
    if (currentInterestStatus === InterestStatus.PENDING) {
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
    }

    // Show the status for sent interest
    if (currentSentInterest) {
      let message = "";

      switch (currentSentInterestStatus) {
        case InterestStatus.ACCEPTED:
          message = `Your interest is accepted 🎉. Check the contact information section now! Exciting times ahead!`;
          break;
        case InterestStatus.PENDING:
          message = `Your interest is pending. Thank you for your patience and we'll update you soon. 🌟`;
          break;
        case InterestStatus.REJECTED:
          message = `Your interest has been declined.`;
          break;
        default:
          message = ""; // Handles unexpected status
      }

      return (
        <p className="text-gray-500 text-sm text-center mb-2">{message}</p>
      );
    }

    // If no interests exist, show the send interest button
    return (
      <div className="text-center mb-2">
        {currentInterestStatus === InterestStatus.REJECTED && (
          <p className="text-gray-500 text-sm mb-2">
            You previously declined an interest on{" "}
            {formatReceivedDate(currentInterest?.createdAt!).toUpperCase()}. If
            you want to try again, feel free to send an interest!
          </p>
        )}
        <button
          onClick={handleSendInterest}
          className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
          aria-label="Send interest"
        >
          Send Interest
        </button>

        {/* Reminder for past actions */}
        {/* {currentInterestStatus === InterestStatus.REJECTED && (
          <p className="text-gray-500 text-sm mt-2">
            You declined an interest on{" "}
            {formatReceivedDate(currentInterest?.createdAt!)}.
          </p>
        )} */}

        {currentInterestStatus === InterestStatus.ACCEPTED && (
          <p className="text-gray-500 text-sm mt-2">
            You accepted an interest on{" "}
            {formatReceivedDate(currentInterest?.createdAt!)}.
          </p>
        )}
      </div>
    );
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
      <div className="flex flex-col lg:flex-row lg:space-x-4 p-6 lg:overflow-visible">
        <div className="lg:w-1/4 lg:sticky lg:top-6 lg:space-y-4 mb-4 lg:mb-0">
          <div className="overflow-auto">
            <ImageGallery
              images={[
                profile?.contactInfo?.photo,
                profile?.horoscopeInfo?.upload,
              ]}
            />
          </div>

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
