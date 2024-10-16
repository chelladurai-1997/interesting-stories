import { useUser } from "@/app/lib/hooks/useUser";
import { useChatScroll } from "./helpers/useChatScroll";
import { ChatMessage } from "../../../lib/hooks/services/useChat";
import { formatChatTimestamp } from "@/app/lib/utils/dateUtils";
import { useSendMessage } from "./helpers/useSendMessage";

type Message = {
  text: string;
};

export const ChatInterface: React.FC<{
  chatName: string;
  lastSeen: string;
  backToChatList: () => void;
  countdown: number;
  chatApiLoading: boolean;
  messages: ChatMessage[];
  sendMessage: (message: Message) => void;
}> = ({ messages, sendMessage, chatApiLoading }) => {
  const { userProfile } = useUser();
  const currUserId = userProfile?.userId;

  const { chatEndRef } = useChatScroll(messages); // Using chat scroll hook
  const { inputMessage, sendingStatus, setInputMessage, handleSendMessage } =
    useSendMessage(sendMessage); // Using send message hook

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages display */}
      <div className="flex-grow p-4 overflow-y-auto pb-2">
        {chatApiLoading && messages.length === 0 ? (
          <div className="text-center text-gray-400">Loading your chat...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet.</div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  currUserId === msg?.senderId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg inline-block max-w-[75%] break-words ${
                    currUserId === msg?.senderId
                      ? "bg-green-100 pb-2"
                      : "bg-gray-100"
                  }`}
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    textAlign: "left", // Text left aligned inside the bubble
                  }}
                >
                  <div>{msg.message}</div>
                  <div className="text-xs text-gray-500">
                    {msg.updatedAt ? formatChatTimestamp(msg.updatedAt) : ""}
                  </div>
                </div>
              </div>
            ))}
            {/* Ref to the end of chat to scroll to it */}
            <div ref={chatEndRef} />
          </>
        )}

        <div className="text-end text-gray-600">{sendingStatus}</div>
      </div>

      {/* Sticky Input Block */}
      <div className="flex items-center p-2 bg-white border-t border-gray-300 sticky bottom-0 z-10">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border border-gray-300 rounded-lg outline-none"
          onKeyDown={(e) => {
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
