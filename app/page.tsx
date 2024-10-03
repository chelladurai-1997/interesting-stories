import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";
import Footer from "./components/organism/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <WelcomeBanner />
      <QuickAccess />
    </main>
  );
}
