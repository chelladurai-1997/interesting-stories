"use client";
import React, { useEffect, useState } from "react";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose?: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match this duration with CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`absolute bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto transform transition-transform duration-300 ease-in-out 
                    ${isAnimating ? "scale-100" : "scale-95"}`}
        style={{ maxHeight: "90vh", overflowY: "auto" }} // Ensure it fits within the viewport
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          🎉 Registration Successful!
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Congratulations on completing your registration! 🎊 Your request has
          been sent to our admin team, and you can expect a call within 24 hours
          for manual verification. Once verified, your profile will be visible
          to others, opening up exciting possibilities for your journey here.
        </p>
        <p className="text-center text-gray-700 mb-4">
          Remember, honesty and loyalty are the keys to finding your perfect
          match. Embrace this journey, and you might just be pleasantly
          surprised along the way! You're in the right place to find your life
          partner.
        </p>
        <p className="text-center text-gray-700 mb-4">
          For now, take a moment to relax and browse through profiles while you
          wait. Have a cheerful day! 🌟
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
