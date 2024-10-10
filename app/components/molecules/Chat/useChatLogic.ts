// useChatLogic.ts
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/app/lib/hooks/useUser";
import useProfilesByUserIds from "@/app/lib/hooks/services/useProfilesByUserIds";
import { InterestStatus } from "@/app/lib/hooks/services/useFetchInterests";
import { ChatMessage, useChat } from "./useChat";
import { Message } from "../ChatModal/ChatModal";
import useUserActivity from "@/app/lib/hooks/useUserActivity";

const useChatLogic = () => {
  const { sentInterests, receivedInterests, userProfile } = useUser();
  const {
    fetchMessages,
    loading: chatApiLoading,
    sendMessage: sendMsgAPI,
  } = useChat();

  const [showChat, setShowChat] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [chatName, setChatName] = useState("");

  const [countdown, setCountdown] = useState(30);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sendingStatus, setSendingStatus] = useState("");
  const [currentReceiverId, setCurrentReceiverId] = useState("");
  const lastSeen = "Tap the profile image for a closer look!";
  const fetchMsgs = useCallback(
    async (receiverId: string) => {
      if (userProfile?.userId && receiverId) {
        const fetchedMessages = await fetchMessages(
          userProfile.userId,
          receiverId
        );

        const newMessages = fetchedMessages?.data ?? [];

        // Compare the _id of the last message in both current and fetched messages
        const lastCurrentMessageId = messages?.at(-1)?._id;
        const lastFetchedMessageId = newMessages?.at(-1)?._id;

        console.log("first=====>", {
          lastCurrentMessageId,
          lastFetchedMessageId,
        });
        if (lastCurrentMessageId !== lastFetchedMessageId) {
          setMessages(newMessages);
        }
      }
    },
    [userProfile?.userId, messages]
  );

  useUserActivity(() => fetchMsgs(currentReceiverId), !showChat);

  // useUserOnlineTracker(messages?.at(-1)?.updatedAt || null, fetchMsgs);
  const accpetedUserIds = sentInterests
    .filter((c) => c.status === InterestStatus.ACCEPTED)
    .map((interest) => interest.receiverId);
  const meAccpetedUserIds = receivedInterests
    .filter((c) => c.status === InterestStatus.ACCEPTED)
    .map((interest) => interest.senderId);

  const result = useProfilesByUserIds([
    ...accpetedUserIds,
    ...meAccpetedUserIds,
  ]);

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
    await fetchMsgs(receiverUserId);
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
      fetchMsgs(currentReceiverId);
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
    chatApiLoading,
  };
};

export default useChatLogic;
