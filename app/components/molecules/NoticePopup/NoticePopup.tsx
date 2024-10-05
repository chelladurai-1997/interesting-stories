"use client";
import React, { useState, useEffect } from "react";

const NoticePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Check localStorage for the "popupShown" flag when the component mounts
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("popupShown");
    if (!hasSeenPopup) {
      setIsOpen(true); // Show the popup if the flag is not set
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("popupShown", "true"); // Set the flag in localStorage
    setIsOpen(false); // Close the popup
  };

  if (!isOpen) return null; // Don't render the popup if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-100 rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
          🌿 Welcome to Our Growing Community!
        </h2>
        <p className="text-green-800 mb-4">
          No matter who you are or where you come from, our platform is designed
          with everyone in mind. 💚 We're currently supporting the{" "}
          <span className="font-bold text-green-600">Kongu Vellalar</span>{" "}
          community, but our doors will soon open to all. 🌍
        </p>
        <p className="text-green-800">
          We believe in creating a space for every individual, embracing
          diversity, and bringing people closer together. Your trust is
          essential to us, and we’re working hard to make sure that when we
          expand, it’s inclusive, supportive, and welcoming for everyone. 🙌
        </p>
        <p className="text-green-800">
          Let’s continue to lift each other up, because together, we can create
          something truly special. 🌱
        </p>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md transition"
            onClick={handleClose}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticePopup;
