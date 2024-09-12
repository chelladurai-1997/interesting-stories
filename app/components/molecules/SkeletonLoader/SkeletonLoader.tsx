// SkeletonLoader.tsx
import React from "react";

const SkeletonLoader: React.FC<{
  className?: string;
  type?: "text" | "image" | "card";
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
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 h-48 w-full rounded-t"></div>
          <div className="p-4">
            <div className="bg-gray-200 h-6 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
            <div className="bg-gray-200 h-6 rounded w-2/4 mt-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
