import React from "react";
import Header from "@/app/components/organism/Header/Header";
import ProfileDetail from "@/app/components/organism/ProfileDetail/ProfileDetail";

const Page: React.FC = () => {
  return (
    <section>
      <Header />
      <ProfileDetail />
    </section>
  );
};

export default Page;
