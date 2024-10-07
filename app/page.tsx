import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";
import NoticePopup from "./components/molecules/NoticePopup/NoticePopup";
import UserInsights from "./components/organism/UserInsights/UserInsights";
import { cookies } from "next/headers";

export default function Home() {
  const isLoggedInUser = !!cookies().get("accessToken")?.value;

  return (
    <main>
      <Header />
      {isLoggedInUser ? (
        <UserInsights />
      ) : (
        <>
          <WelcomeBanner />
          <NoticePopup />
          <QuickAccess />
        </>
      )}
    </main>
  );
}
