import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";
import NoticePopup from "./components/molecules/NoticePopup/NoticePopup";
import UserInsights from "./components/organism/UserInsights/UserInsights";
import { cookies } from "next/headers";
import WelcomeMessage from "./components/molecules/WelcomeMessage/WelcomeMessage";

export default async function Home() {
  const isLoggedInUser = !!cookies().get("accessToken")?.value;

  return (
    <main>
      <Header />
      {isLoggedInUser ? (
        <>
          <WelcomeMessage />
          <UserInsights />
        </>
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
