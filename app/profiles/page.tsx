import { Suspense } from "react";
import Header from "../components/organism/Header/Header";
import ProfileList from "../components/organism/ProfileList/ProfileList";
import QuickAccess from "../components/organism/QuickAccess/QuickAccess";

export default function Home() {
  return (
    <main>
      <Header />
      <Suspense>
        <ProfileList />
      </Suspense>
      <QuickAccess />
    </main>
  );
}
