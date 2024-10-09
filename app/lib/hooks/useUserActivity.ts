import { useEffect, useRef, useState } from "react";

// Define the type for the fetchData function
type FetchDataFunction = () => void;

// Custom hook to monitor user activity
const useUserActivity = (fetchData: FetchDataFunction, skip: boolean): void => {
  const [lastActiveTime, setLastActiveTime] = useState<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetActiveTime = () => {
    setLastActiveTime(Date.now());
    console.log("User activity detected, resetting last active time"); // Log when activity is detected
  };

  useEffect(() => {
    if (skip) return;
    // Set up event listeners to detect user activity
    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetActiveTime);
      console.log(`Added event listener for: ${event}`); // Log added event listeners
    });

    // Start the polling interval
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActive = currentTime - lastActiveTime;

      console.log(`Current Time: ${new Date(currentTime).toISOString()}`); // Log the current time
      console.log(
        `Last Active Time: ${new Date(lastActiveTime).toISOString()}`
      ); // Log the last active time
      console.log(
        `Time since last active: ${timeSinceLastActive / 1000} seconds`
      ); // Log the elapsed time since last active

      if (timeSinceLastActive < 32000) {
        // Check if last active time is less than 60 seconds
        console.log("Fetching data..."); // Log before fetching data
        fetchData();
      } else {
        console.log("User is idle for more than 30 seconds, skipping fetch"); // Log when skipping fetch
      }
    }, 8000); // Poll every 15 seconds

    // Cleanup function to remove event listeners and clear the interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log("Cleanup: Cleared interval on unmount");
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetActiveTime);
        console.log(`Removed event listener for: ${event}`); // Log removed event listeners
      });
    };
  }, [lastActiveTime, skip]); // Dependency array includes lastActiveTime to ensure effect runs when it changes
};

export default useUserActivity;
