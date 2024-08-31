import Banner from "./components/organism/Banner/Banner";
import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";

export default function Home() {
  return (
    <main>
      <Header showSearchForm />
      <Banner />
      <QuickAccess />
    </main>
  );
}
