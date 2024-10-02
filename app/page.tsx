import Header from "./components/organism/Header/Header";
import QuickAccess from "./components/organism/QuickAccess/QuickAccess";
import ProfileList from "./components/organism/ProfileList/ProfileList";
import FilterModal from "./components/organism/FilterModal/FilterModal";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="bg-teal-500 text-gray-900 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover Your Perfect Match
          </h1>
          <p className="text-xl mb-6">
            Browse profiles and find the person you've been waiting for. Start
            your journey today!
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold m-4 text-teal-600">Profiles</h1>
      </div>
      <ProfileList />

      <FilterModal />
      <QuickAccess />
    </main>
  );
}
