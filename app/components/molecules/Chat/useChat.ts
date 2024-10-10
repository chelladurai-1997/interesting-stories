import { useUser } from "@/app/lib/hooks/useUser";
import { useState } from "react";

interface SendMessageResponse {
  message: string;
  data?: any;
  error: boolean;
}

interface FetchMessagesResponse {
  message: string;
  data: ChatMessage[];
  error: boolean;
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Custom hook for chat functionality
export const useChat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useUser();

  // Function to send a new chat message (POST)
  const sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<SendMessageResponse | undefined> => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userProfile?.accessToken}`,
        },
        body: JSON.stringify({ senderId, receiverId, message }),
      });

      const data: SendMessageResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error: any) {
      setError(error.message || "An unknown error occurred.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch chat messages (GET)
  const fetchMessages = async (
    userId: string,
    chatUserId: string
  ): Promise<FetchMessagesResponse | undefined> => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch(`/api/chat?chatUserId=${chatUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userProfile?.accessToken}`,
        },
      });

      const data: FetchMessagesResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error: any) {
      setError(error.message || "An unknown error occurred.");
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, fetchMessages, loading, error };
};
