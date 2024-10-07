import React from "react";

interface OverviewSectionProps {
  recentVisitorsCount: number;
  pendingInterestsCount: number;
  acceptedInterestsCount: number;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  recentVisitorsCount,
  pendingInterestsCount,
  acceptedInterestsCount,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Recent Visitors */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
        <span>Visitors who checked out your profile</span>
        <span className="bg-blue-500 text-white rounded-full px-3 py-1">
          {recentVisitorsCount}
        </span>
      </div>

      {/* Pending Interests */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
        <span>People you're waiting to hear from</span>
        <span className="bg-yellow-500 text-white rounded-full px-3 py-1">
          {pendingInterestsCount}
        </span>
      </div>

      {/* Accepted Interests */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
        <span>Connections you've made</span>
        <span className="bg-green-500 text-white rounded-full px-3 py-1">
          {acceptedInterestsCount}
        </span>
      </div>
    </div>
  );
};

export default OverviewSection;
