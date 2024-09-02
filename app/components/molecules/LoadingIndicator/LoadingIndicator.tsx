import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <img
          src="https://media.tenor.com/quAl5RoQDCMAAAAi/peach-cat-bored.gif"
          alt="Loading..."
          className="w-32 mb-4" // Tailwind class for width and margin
        />
        <p className="text-lg font-bold text-gray-800">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
