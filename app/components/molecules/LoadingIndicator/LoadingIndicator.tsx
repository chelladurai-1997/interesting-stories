import React, { useEffect, useState } from "react";

const LoadingIndicator: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let finalIncrementInterval: NodeJS.Timeout | null = null;
    let increment = 0.5; // Increase the increment amount for faster progress
    let incrementSpeed = 0.05; // Speed up the increment

    // Initial progress phase up to 98%
    if (progress < 98) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 98) {
            const newProgress = Math.min(prev + increment, 98);
            increment = increment + incrementSpeed; // Gradually increase speed
            return newProgress;
          }
          return prev;
        });
      }, 30); // Faster update interval for quicker animation
    } else {
      // Final increment phase from 98% to 98.99%
      if (progressInterval) clearInterval(progressInterval);

      let finalIncrement = 0.1;
      let slowDownSpeed = 0.01; // Slow down increment speed

      finalIncrementInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 98.99) {
            const newProgress = Math.min(prev + finalIncrement, 98.99);
            finalIncrement = finalIncrement - slowDownSpeed; // Gradually slow down
            return newProgress;
          }
          return prev;
        });
      }, 30); // Faster update interval for quicker animation
    }

    // Cleanup intervals on unmount
    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (finalIncrementInterval) clearInterval(finalIncrementInterval);
    };
  }, [progress]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-xs w-full mx-4 text-center">
        <img
          src="https://media.tenor.com/quAl5RoQDCMAAAAi/peach-cat-bored.gif"
          alt="Loading..."
          className="w-24 h-24 mb-4 rounded-full shadow-md"
        />
        <div className="relative w-full">
          <div
            className="h-2 rounded transition-all duration-500 ease-in-out animate-pulse"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)`, // Rainbow gradient
              backgroundSize: "200% 100%",
              backgroundPosition: "left center",
            }}
          />
          <p className="text-sm font-medium text-gray-800 mt-2">
            Almost there! Your image is a bit of a heavyweight, so it's taking a
            little extra time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
