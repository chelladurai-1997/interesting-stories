"use client";
import React from "react";
import { CloseIcon } from "../../icons/CloseIcon";

interface TermsConditionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsConditionsPopup: React.FC<TermsConditionsPopupProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      {" "}
      {/* Increased z-index */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full relative z-[10000]">
        {" "}
        {/* Ensure content inside the popup is also layered correctly */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Terms and Conditions
        </h2>
        <div className="text-gray-700 mb-4 h-64 overflow-y-auto">
          <p className="mb-2">
            1. <strong>Eligibility</strong>: By registering on this platform,
            users must be at least 18 years old.
          </p>
          <p className="mb-2">
            2. <strong>User Responsibilities</strong>: Users are responsible for
            the accuracy of the information they provide. Misleading profiles or
            content will be removed.
          </p>
          <p className="mb-2">
            3. <strong>Privacy</strong>: We respect your privacy and will only
            share your data with users you connect with or as required by law.
          </p>
          <p className="mb-2">
            4. <strong>Termination</strong>: We reserve the right to terminate
            accounts that violate our terms of service.
          </p>
          <p className="mb-2">
            5. <strong>Disputes</strong>: Any disputes that arise between users
            should be handled with mutual respect, and the platform holds no
            liability for personal disputes.
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md transition"
            onClick={onClose}
            type="button"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPopup;
