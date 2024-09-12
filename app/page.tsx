import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import ProfileList from "./components/organism/ProfileList/ProfileList";

export default function Home() {
  return (
    <main>
      <Header showSearchForm />
      <ProfileList />
      <QuickAccess />
    </main>
  );
}
