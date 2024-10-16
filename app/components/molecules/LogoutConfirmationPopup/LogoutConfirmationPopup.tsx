"use client";
import React from "react";
import { useUser } from "@/app/lib/hooks/useUser"; // Assuming you have a useUser hook to manage user logout

interface LogoutConfirmationPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutConfirmationPopup: React.FC<LogoutConfirmationPopupProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { logout } = useUser(); // Fetch logout function from your user hook

  const handleConfirmLogout = () => {
    logout(true); // Perform logout
    setIsOpen(false); // Close the popup after logout
  };

  const handleCancelLogout = () => {
    setIsOpen(false); // Close the popup without logging out
  };

  return (
    <>
      {/* Logout Confirmation Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-800 mb-4">
              You are about to be logged out. Do you want to continue?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md transition hover:bg-red-700"
                onClick={handleConfirmLogout}
              >
                Yes, Log me out
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md transition hover:bg-gray-700"
                onClick={handleCancelLogout}
              >
                No, Stay logged in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutConfirmationPopup;
