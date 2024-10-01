// useSendInterest.ts
import { useState } from "react";
import toast from "react-hot-toast";

const useSendInterest = (currentUserId: string | undefined) => {
  const [isInterestSent, setIsInterestSent] = useState(false);

  const sendInterest = async (receiverId: string) => {
    if (!currentUserId) {
      // Show toast if user is not logged in
      toast.error("You must be logged in to send interest.");
      return;
    }

    try {
      // Disable the button to prevent multiple submissions
      setIsInterestSent(true);

      // API call to send interest
      const response = await fetch("/api/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: currentUserId, // The user who is sending the interest
          receiverId: receiverId, // The profile the interest is sent to
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Interest sent successfully!");
      } else {
        throw new Error(data.message || "Failed to send interest.");
      }
    } catch (error) {
      toast.error("Failed to send interest. Please try again.");
      setIsInterestSent(false); // Re-enable the button on failure
    }
  };

  return { isInterestSent, sendInterest };
};

export default useSendInterest;
