import React from "react";

const BrandLogo: React.FC = () => (
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor"
      className="w-12 h-12 text-red-600"
    >
      {/* Two intertwined hearts */}
      <path d="M50 10C36.19 10 25 21.19 25 35c0 8.84 4.49 16.63 11.5 22.02L50 70l13.5-12.98C70.51 51.63 75 43.84 75 35c0-13.81-11.19-25-25-25zm0 5c11.05 0 20 8.95 20 20 0 6.63-3.37 12.44-8.57 16.25l-11.43 10.99-11.43-10.99C33.37 47.44 30 41.63 30 35c0-11.05 8.95-20 20-20zM38 40.5c-4.83 0-8.75-3.92-8.75-8.75S33.17 23 38 23s8.75 3.92 8.75 8.75S42.83 40.5 38 40.5zm24 0c-4.83 0-8.75-3.92-8.75-8.75S57.17 23 62 23s8.75 3.92 8.75 8.75S66.83 40.5 62 40.5z" />
    </svg>
    <span className="ml-2 text-2xl font-bold text-gray-800">LinkHearts</span>
  </div>
);

export default BrandLogo;
