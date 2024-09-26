import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import ProfileList from "./components/organism/ProfileList/ProfileList";

export default function Home() {
  return (
    <main>
      <Header showSearchForm />
      {/* <ProfileList /> */}
      <div className="bg-teal-500 text-gray-900 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover Your Perfect Match
          </h1>
          <p className="text-xl mb-6">
            Browse profiles and find the person you've been waiting for. Start
            your journey today!
          </p>
          <button className="bg-gray-900 text-[#ffd700] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 hover:shadow-xl transition-all duration-300 ease-in-out">
            Browse Profiles
          </button>
        </div>
      </div>

      <QuickAccess />
    </main>
  );
}
