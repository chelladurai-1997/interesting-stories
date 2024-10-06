import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";
import Footer from "./components/organism/Footer/Footer";
import NoticePopup from "./components/molecules/NoticePopup/NoticePopup";
import UserInsights from "./components/organism/UserInsights/UserInsights";

export default function Home() {
  return (
    <main>
      <Header />
      <UserInsights />
      <WelcomeBanner />
      <NoticePopup />
      <QuickAccess />
    </main>
  );
}
