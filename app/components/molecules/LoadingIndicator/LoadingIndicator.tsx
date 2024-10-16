"use client";

import React from "react";
import useLoadingProgress from "./helpers/useLoadingProgress";
import Image from "next/image";

const LoadingIndicator: React.FC = () => {
  const progress = useLoadingProgress();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-xs w-full mx-4 text-center">
        <Image
          src={"/assets/images/loadingcat.gif"}
          alt="Loading..."
          width={96}
          height={96}
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
            Hold on, your image is taking a little longer because it's extra
            special!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
