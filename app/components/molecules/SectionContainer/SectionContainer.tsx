import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <section className="bg-white p-6 sm:p-10 border max-w-[800px] mx-auto">
      {children}
    </section>
  );
};

export default FormContainer;
