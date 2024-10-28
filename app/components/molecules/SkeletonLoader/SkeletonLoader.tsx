// SkeletonLoader.tsx
import React from "react";

const SkeletonLoader: React.FC<{
  className?: string;
  type?: "text" | "image" | "card" | "default";
}> = ({ className = "", type = "text" }) => {
  return (
    <div className={`${className} animate-pulse`}>
      {type === "text" && (
        <div className="space-y-4">
          <div className="bg-gray-200 h-6 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-6 rounded w-1/2"></div>
        </div>
      )}

      {type === "image" && (
        <div className="bg-gray-200 h-48 w-full rounded"></div>
      )}

      {type === "card" && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <li
              key={index}
              className="flex p-4 bg-gray-200 rounded animate-pulse"
            >
              {/* Profile Image Skeleton */}
              <div className="flex-shrink-0 w-24 h-24 bg-gray-300 rounded"></div>

              {/* Profile Details Skeleton */}
              <div className="flex-grow ml-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 bg-gray-300 rounded mb-1"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {type === "default" && (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          {/* Loading Text */}
          <p className="text-lg text-gray-800 font-semibold">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
