// useChatLogic.ts
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/app/lib/hooks/useUser";
import useProfilesByUserIds from "@/app/lib/hooks/services/useProfilesByUserIds";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { ChatMessage, useChat } from "./useChat";
import { Message } from "../ChatModal/ChatModal";
import useUserActivity from "@/app/lib/hooks/useUserActivity";

const useChatLogic = () => {
  const { sentInterests, userProfile } = useUser();
  const { fetchMessages, sendMessage: sendMsgAPI } = useChat();

  const [showChat, setShowChat] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [chatName, setChatName] = useState("");

  const [countdown, setCountdown] = useState(30);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sendingStatus, setSendingStatus] = useState("");
  const [currentReceiverId, setCurrentReceiverId] = useState("");
  const lastSeen = "Nothing wrong with making the first move";
  const fetchMsgs = useCallback(async () => {
    if (userProfile?.userId) {
      const fetchedMessages = await fetchMessages(userProfile.userId);
      setMessages(fetchedMessages?.data ?? []);
    }
  }, [userProfile?.userId]);

  useUserActivity(fetchMsgs, !showChat);

  // useUserOnlineTracker(messages?.at(-1)?.updatedAt || null, fetchMsgs);

  const result = useProfilesByUserIds(
    sentInterests
      .filter((c) => c.status === InterestStatus.ACCEPTED)
      .map((interest) => interest.receiverId)
  );

  const chatPreviewUsers = result?.profiles;

  // Manage countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showChatInterface = async (name: string, receiverUserId: string) => {
    setShowPreview(false);
    setCurrentReceiverId(receiverUserId);
    setChatName(name);
    await fetchMsgs();
  };

  const backToChatList = () => {
    setMessages([]);
    setShowPreview(true);
  };

  const closePreviewList = () => {
    setShowChat(false);
  };

  const sendMessage = async (message: Message) => {
    if (message.text.trim()) {
      setSendingStatus("Sending...");
      const success = await sendMsgAPI(
        userProfile?.userId!,
        currentReceiverId,
        message.text
      );
      setSendingStatus(success ? "Sent" : "Failed to send message");
      fetchMsgs();
    }
  };

  return {
    showChat,
    setShowChat,
    showPreview,
    chatName,
    lastSeen,
    countdown,
    messages,
    sendingStatus,
    chatPreviewUsers,
    currentReceiverId,
    fetchMsgs,
    showChatInterface,
    backToChatList,
    closePreviewList,
    sendMessage,
  };
};

export default useChatLogic;
