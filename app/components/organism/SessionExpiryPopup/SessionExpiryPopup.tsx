import { useUser } from "@/app/lib/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface SessionExpiryPopupProps {
  expiryTime: number; // Time in milliseconds when the access token will expire
  onSessionExpired: () => void; // Callback to handle session expiry
  onContinueBrowsingClick: () => void; // Callback for the "Continue Browsing" button
}

const SessionExpiryPopup: React.FC<SessionExpiryPopupProps> = ({
  expiryTime,
  onSessionExpired,
  onContinueBrowsingClick,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false); // Determines if the popup is visible
  const [isLoading, setIsLoading] = useState<boolean>(false); // Controls the loader when refreshing the token
  const [timeLeft, setTimeLeft] = useState<number>(expiryTime - Date.now()); // Remaining time before the token expires
  const [hasExpired, setHasExpired] = useState<boolean>(false); // Indicates if the session has expired

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Holds the interval reference for clearing it later

  const { refreshAccessToken, logout } = useUser(); // Using refreshAccessToken from the UserContext
  const router = useRouter();

  /**
   * Function to check the remaining time and update state accordingly.
   */
  const checkExpiry = () => {
    const timeLeftInSeconds = (expiryTime - Date.now()) / 1000; // Calculate time left in seconds
    setTimeLeft(timeLeftInSeconds); // Update the remaining time state

    // Show the popup if less than 60 seconds remain and it hasn't expired yet
    if (timeLeftInSeconds <= 60 && !isVisible && !hasExpired) {
      setIsVisible(true);
    }

    // If time has expired, trigger session expiry
    if (timeLeftInSeconds <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear the interval
      setIsVisible(false); // Hide the popup
      setHasExpired(true); // Mark the session as expired
      // onSessionExpired(); // Trigger the session expired callback
    }
  };

  useEffect(() => {
    // Set an interval to check the session expiry every second
    intervalRef.current = setInterval(checkExpiry, 1000);

    return () => {
      // Clear the interval on component unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [expiryTime, isVisible, hasExpired]);

  /**
   * Function to handle the "Stay Logged In" button click.
   * Calls the refresh token function and resets the expiry check.
   */
  const handleStayLoggedIn = async () => {
    setIsLoading(true); // Show the loader while refreshing the token

    try {
      await refreshAccessToken(); // Call the token refresh function from context

      // Reset the popup and expiry state after refreshing the token
      setIsVisible(false);
      setIsLoading(false);
      setHasExpired(false);

      // Reset the interval to monitor the new expiry time
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => checkExpiry(), 1000); // Restart interval
    } catch (error) {
      console.error("Error refreshing token"); // Handle errors in token refresh
      setIsLoading(false); // Stop the loader
    }
  };

  return (
    <div>
      {/* Show popup when session is about to expire and hasn't expired */}
      {isVisible && !hasExpired && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          role="alert"
          aria-live="assertive" // Ensures screen readers announce the popup
        >
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">
              Session Expiring Soon
            </h2>
            <p className="mb-4">
              Your session will expire in {Math.floor(timeLeft)} seconds.
            </p>

            <div className="flex justify-center">
              {isLoading ? (
                // Show loader while refreshing the token
                <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={handleStayLoggedIn} // Handle staying logged in
                >
                  Stay Logged In
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show popup if the session has expired */}
      {hasExpired && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center"
          role="alert"
          aria-live="assertive" // Screen reader announcement
        >
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
            <p className="mb-4">
              Your session has expired. Please log in again or continue
              browsing.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onSessionExpired}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Log In
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={onContinueBrowsingClick} // Handle "Continue Browsing"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionExpiryPopup;
