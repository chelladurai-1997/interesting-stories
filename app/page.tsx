import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import WelcomeBanner from "./components/molecules/WelcomeBanner/WelcomeBanner";
import NoticePopup from "./components/molecules/NoticePopup/NoticePopup";
import UserInsights from "./components/organism/UserInsights/UserInsights";
import { cookies } from "next/headers";
import WelcomeMessage from "./components/molecules/WelcomeMessage/WelcomeMessage";
import { movingImages } from "./lib/constants/global.constant";
import MarqueeCarousel from "./components/molecules/MarqueeCarousel/MarqueeCarousel";

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
          <div className="relative">
            <WelcomeBanner />
            {/* Wrapper div for the overlay */}
            <div className="relative">
              {/* Overlay with absolute positioning */}
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              {/* MarqueeCarousel positioned above the overlay */}
              <div className="relative z-20">
                <MarqueeCarousel
                  images={movingImages}
                  duplicateCount={1}
                  direction="left"
                  speed={35}
                />
              </div>
            </div>
          </div>

          <NoticePopup />
          <QuickAccess />
        </>
      )}
    </main>
  );
}
