import { useEffect, useRef } from "react";
import { ChatMessage } from "../../../../lib/hooks/services/useChat";

export const useChatScroll = (messages: ChatMessage[]) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return { chatEndRef };
};
