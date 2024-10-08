import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  isSent: boolean; // true if sent, false if received
  timestamp?: string; // to store the timestamp of the message
};

export const ChatInterface: React.FC<{
  chatName: string;
  lastSeen: string;
  backToChatList: () => void;
  countdown: number;
  messages: Message[];
  sendMessage: (message: Message) => void;
}> = ({ messages, sendMessage }) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [sendingStatus, setSendingStatus] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null); // Ref to track the chat end

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to bottom when a new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const messageToSend = {
        text: inputMessage,
        isSent: true,
        timestamp: new Date().toLocaleTimeString(), // Get current time as a timestamp
      };

      setSendingStatus("Sending...");
      sendMessage(messageToSend);

      // Clear the input immediately after sending the message
      setInputMessage("");

      // Simulate sending with delay (to show "Sending..." state)
      setTimeout(() => {
        setSendingStatus("Sent");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages display */}
      <div className="flex-grow p-4 overflow-y-auto pb-20">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet.</div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  msg.isSent ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg inline-block max-w-[75%] break-words ${
                    msg.isSent ? "bg-green-100 pb-2" : "bg-gray-100"
                  }`}
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    textAlign: "left", // Text left aligned inside the bubble
                  }}
                >
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500">
                    {msg.timestamp}
                  </div>{" "}
                  {/* Timestamp */}
                </div>
              </div>
            ))}
            {/* Ref to the end of chat to scroll to it */}
            <div ref={chatEndRef} />
          </>
        )}
        {sendingStatus && (
          <div className="text-end text-gray-600">{sendingStatus}</div> // Show sending status
        )}
      </div>

      {/* Sticky Input Block */}
      <div className="flex items-center p-2 bg-white border-t border-gray-300 sticky bottom-0 z-10">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border border-gray-300 rounded-lg"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
              e.preventDefault();
            }
          }}
        />
        <button
          className="ml-2 p-2 bg-green-600 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
