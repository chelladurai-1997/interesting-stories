import React, { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <section className="bg-white p-6 sm:p-10 border max-w-[800px] mx-auto">
      {children}
    </section>
  );
};

export default SectionContainer;
