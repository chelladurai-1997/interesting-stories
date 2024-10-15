"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Next.js hook to get the current pathname
import { useUser } from "@/app/lib/hooks/useUser";
import { useRegistrationNavigation } from "@/app/lib/hooks/useRegistrationNavigation";
import { formSectionDefaultState } from "@/app/lib/constants/global.constant";

const RegistrationNoticePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname
  const { userProfile, logout } = useUser(); // Fetch user profile
  const { navigateToNextStep } = useRegistrationNavigation();

  // Effect to handle popup visibility based on user profile and pathname changes
  useEffect(() => {
    // Check if pathname starts with /profile-info/
    const isProfileInfoPath = /^\/profile-info\//.test(pathname);
    if (
      !isProfileInfoPath &&
      userProfile?.userId &&
      userProfile.completionPercentage !== 100
    ) {
      setIsOpen(true); // Show the popup if the user has not completed registration
    } else {
      setIsOpen(false); // Hide the popup if the user has completed registration
    }
  }, [pathname, userProfile]); // Re-run the effect when pathname or userProfile changes

  const handleProceedRegistration = () => {
    setIsOpen(false); // Close the popup
    navigateToNextStep(
      userProfile?.completedSections ?? formSectionDefaultState
    );
  };

  const handleBrowseAsGuest = () => {
    setIsOpen(false);
    logout(true);
  };

  return (
    <>
      {/* Popup content */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Registration Incomplete
            </h2>
            <p className="text-gray-800 mb-4">
              You haven’t completed your registration. Would you like to finish
              your profile or browse as a guest?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md transition hover:bg-blue-700"
                onClick={handleProceedRegistration}
              >
                Finish Profile
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md transition hover:bg-gray-700"
                onClick={handleBrowseAsGuest}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationNoticePopup;
