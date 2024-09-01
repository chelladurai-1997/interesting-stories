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
  return (
    <div className="text-center mb-6 space-y-1 border-b border-gray-300 pb-4">
      <h4 className="text-lg font-semibold">{step}</h4>
      <h1 className="text-2xl font-bold ">{title}</h1>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
