import Head from "next/head";
import Tabs from "./components/Tabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          So Many Stories Await: Dive In and Discover What’s Next!
        </h1>
        <Tabs />
      </main>
    </div>
  );
}
