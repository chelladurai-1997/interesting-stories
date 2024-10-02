// useSendInterest.ts
import toast from "react-hot-toast";
import { useUser } from "../useUser";

// Define a type for the body of the request
interface InterestBody {
  senderId: string;
  receiverId: string;
  interestId?: string; // Optional property
  status?: string; // Optional property
}

const useSendInterest = (currentUserId: string | undefined) => {
  const { fetchInterests } = useUser();

  // Function to send a new interest or update an existing interest
  const sendInterest = async (
    receiverId: string,
    interestId?: string,
    status?: string
  ) => {
    if (!currentUserId) {
      // Show toast if user is not logged in
      toast.error(
        "Oops! Looks like you're not logged in yet. Please log in to send an interest."
      );
      return;
    }

    try {
      // Prepare the body for the API call
      const body: InterestBody = {
        senderId: currentUserId, // The user who is sending the interest
        receiverId: receiverId, // The profile the interest is sent to
      };

      // If interestId is provided, include it and status for updating
      if (interestId && status) {
        body.interestId = interestId;
        body.status = status; // status can be 'accepted' or 'declined'
      }

      // API call to send or update interest
      const response = await fetch("/api/interests", {
        method: "POST", // We still use POST for both sending and updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (interestId) {
          // If an interestId was provided, it's an update
          toast.success(
            `Interest ${
              status === "accepted" ? "accepted" : "declined"
            } successfully!`
          );
        } else {
          // Otherwise, it's a new interest
          toast.success("Interest sent successfully!");
        }
        fetchInterests(); // Fetch updated interests after sending/updating
      } else {
        throw new Error(data.message || "Failed to send interest.");
      }
    } catch (error) {
      toast.error("Failed to process interest. Please try again.");
    }
  };

  return { sendInterest };
};

export default useSendInterest;