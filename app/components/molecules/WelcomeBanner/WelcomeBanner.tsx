"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const WelcomeBanner = () => {
  const [hasVisited, setHasVisited] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const router = useRouter();

  const enableFullscreen = async () => {
    try {
      const doc = document.documentElement;

      if (!isFullscreen) {
        // Enter fullscreen
        if (doc.requestFullscreen) {
          await doc.requestFullscreen();
        } else if (doc.webkitRequestFullscreen) {
          // Safari
          await doc.webkitRequestFullscreen();
        } else if (doc.msRequestFullscreen) {
          // IE/Edge
          await doc.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          // Safari
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
      alert("Fullscreen permission denied or not supported.");
    }
  };

  useEffect(() => {
    enableFullscreen();
  }, []);

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
    <>
      <div className={`bg-teal-500 text-gray-900 py-16 px-8 `}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover Your Perfect Match
          </h1>
          <p className="text-xl mb-6">
            Browse profiles and find the person you've been waiting for. Start
            your journey today!
          </p>
          <Link
            href={"/profiles"}
            className="mt-4 bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            {hasVisited ? "Explore Profiles" : "Get Started"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomeBanner;
