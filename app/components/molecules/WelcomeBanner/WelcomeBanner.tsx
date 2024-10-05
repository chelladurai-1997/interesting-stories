"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const WelcomeBanner = () => {
  const [hasVisited, setHasVisited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.prefetch("/profiles");
    }
  }, [router]);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    if (visited) {
      setHasVisited(true);
    } else {
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <div className={`bg-teal-500 text-gray-900 py-16 px-8`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Match</h1>
        <p className="text-xl mb-6">
          Browse profiles and find the person you've been waiting for. Start
          your journey today!
        </p>
        <Link
          href={"/profiles"}
          className="mt-4 bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {hasVisited ? "Explore Profiles" : "Get Started"}
        </Link>
      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 - Register */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="text-4xl text-teal-500 mx-auto mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">1. Register</h3>
            <p className="text-gray-700">
              Sign up quickly, fill in your details, and join the community.
              It's easy and fast!
            </p>
          </div>

          {/* Step 2 - Send Interest */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="text-4xl text-red-500 mx-auto mb-4">❤️</div>
            <h3 className="text-2xl font-bold mb-2">2. Send Interest</h3>
            <p className="text-gray-700">
              Found someone interesting? Let them know by sending an interest
              notification.
            </p>
          </div>

          {/* Step 3 - Interest Accepted */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="text-4xl text-green-500 mx-auto mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">3. Interest Accepted</h3>
            <p className="text-gray-700">
              When they accept your interest, you're one step closer to making a
              connection.
            </p>
          </div>

          {/* Step 4 - Access Information */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="text-4xl text-blue-500 mx-auto mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-2">4. Access Info</h3>
            <p className="text-gray-700">
              Gain access to their mobile number and address info for more
              direct communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
