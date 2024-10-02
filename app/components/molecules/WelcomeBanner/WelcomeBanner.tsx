"use client";
import React, { useState, useEffect } from "react";

const WelcomeBanner = () => {
  // State to manage the visibility of the banner
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false); // State to manage hiding animation

  useEffect(() => {
    // Check localStorage to see if the banner was already closed
    const bannerClosed = localStorage.getItem("bannerClosed");
    if (bannerClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleGetStarted = () => {
    // Start the hiding animation
    setIsHiding(true);
    // Set the banner as closed in localStorage after a delay
    setTimeout(() => {
      localStorage.setItem("bannerClosed", "true");
      setIsVisible(false);
    }, 300); // Match this duration with the CSS transition duration
  };

  // If the banner is not visible after hiding, do not render it
  if (!isVisible) return null;

  return (
    <div
      className={`bg-teal-500 text-gray-900 py-16 px-8 transition-opacity duration-300 ${
        isHiding ? "opacity-0" : "opacity-100"
      }`}
      style={{ animation: isHiding ? "fadeOut 0.5s" : "fadeIn 0.5s" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Match</h1>
        <p className="text-xl mb-6">
          Browse profiles and find the person you've been waiting for. Start
          your journey today!
        </p>
        <button
          onClick={handleGetStarted}
          className="mt-4 bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
