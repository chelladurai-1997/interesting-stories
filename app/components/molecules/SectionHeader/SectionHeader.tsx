import { useUser } from "@/app/lib/hooks/useUser";
import React from "react";

interface SectionHeaderProps {
  step: string;
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  step,
  title,
  subtitle,
}) => {
  const { userProfile } = useUser();
  return (
    <div className="text-left mb-6 space-y-1 border-b border-gray-300 pb-4">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <h4 className="text-lg font-normal ">{subtitle}</h4>

      <div className="flex justify-between mb-1">
        <p className="text-sm text-[#70757a]">{step}</p>
        <span className="text-sm font-medium text-[#70757a] ">
          {userProfile?.completionPercentage ?? 0}% Completed
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#70757a] h-2.5 rounded-full"
          style={{ width: (userProfile?.completionPercentage ?? 0) + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default SectionHeader;
