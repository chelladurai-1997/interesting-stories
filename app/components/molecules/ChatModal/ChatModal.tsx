import { ChatInterface } from "../Chat/ChatInterface";
import { ChatMessage } from "../../../lib/hooks/services/useChat";
import { Profile } from "@/app/profiles/profile.types";
import { ChatHeader } from "./helpers/ChatHeader";

// Define Message type
export type Message = {
  text: string;
};

export const ChatModal: React.FC<{
  chatName: string;
  lastSeen: string;
  showingChatUserId: string;
  sendingStatus: string;
  backToChatList: () => void;
  countdown: number;
  chatApiLoading: boolean;
  messages: ChatMessage[];
  sendMessage: (message: Message) => void;
  closeChat: () => void;
  activeChatUserProfile: Profile | null;
}> = ({
  chatName,
  lastSeen,
  backToChatList,
  countdown,
  messages,
  sendMessage,
  showingChatUserId,
  activeChatUserProfile,
  chatApiLoading,
  closeChat,
}) => {
  return (
    <div className="fixed top-0 right-0 h-full flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto z-40 bg-white">
      {/* Chat Header */}
      <ChatHeader
        chatName={chatName}
        lastSeen={lastSeen}
        showingChatUserId={showingChatUserId}
        activeChatUserProfile={activeChatUserProfile}
        backToChatList={backToChatList}
        closeChat={closeChat}
      />

      {/* Chat Interface */}
      <div className="flex-grow overflow-y-auto">
        <ChatInterface
          chatName={chatName}
          lastSeen={lastSeen}
          backToChatList={backToChatList}
          countdown={countdown}
          messages={messages}
          sendMessage={sendMessage}
          chatApiLoading={chatApiLoading}
        />
      </div>
    </div>
  );
};
