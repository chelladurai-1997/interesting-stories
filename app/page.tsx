import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import ProfileList from "./components/organism/ProfileList/ProfileList";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";

export default function Home() {
  return (
    <main>
      <Header />
      <WelcomeBanner />
      <ProfileList />
      <QuickAccess />
    </main>
  );
}
