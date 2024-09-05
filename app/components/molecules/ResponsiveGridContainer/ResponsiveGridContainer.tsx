import React, { ReactNode } from "react";

interface ResponsiveGridContainerProps {
  children: ReactNode;
}

const ResponsiveGridContainer: React.FC<ResponsiveGridContainerProps> = ({
  children,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
};

export default ResponsiveGridContainer;
