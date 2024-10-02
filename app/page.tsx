import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import ProfileList from "./components/organism/ProfileList/ProfileList";
import FilterModal from "./components/organism/FilterModal/FilterModal";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";

export default function Home() {
  return (
    <main>
      <Header />
      <WelcomeBanner />
      <ProfileList />
      <FilterModal />
      <QuickAccess />
    </main>
  );
}
