import { useState } from "react";

type Message = {
  text: string;
};

export const useSendMessage = (sendMessage: (message: Message) => void) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [sendingStatus, setSendingStatus] = useState<string>("");

  const handleSendMessage = () => {
    setSendingStatus("Sending...");
    if (inputMessage.trim()) {
      const messageToSend = {
        text: inputMessage,
      };

      sendMessage(messageToSend);
      setInputMessage(""); // Clear input after sending

      // Simulate sending with delay (to show "Sending..." state)
      setTimeout(() => {
        setSendingStatus("");
      }, 1000);
    }
  };

  return {
    inputMessage,
    sendingStatus,
    setInputMessage,
    handleSendMessage,
  };
};
