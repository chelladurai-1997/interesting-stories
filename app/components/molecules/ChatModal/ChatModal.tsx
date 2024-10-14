import Link from "next/link";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { ChatInterface } from "../Chat/ChatInterface";
import { ChatMessage } from "../Chat/useChat";
import Image from "next/image";
import { Profile } from "@/app/profiles/profile.types";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const profileDetailHref = "/profiles/" + showingChatUserId;
  return (
    <div className="fixed top-0 right-0 h-full flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto z-40 bg-white">
      {/* Sticky Header */}

      <div className="bg-green-600 text-white p-4 flex items-center sticky top-0 z-50">
        <button className="text-white mr-3" onClick={backToChatList}>
          <BackArrowIcon />
        </button>
        <Link
          href={profileDetailHref}
          onClick={() => {
            if (pathname === profileDetailHref) {
              closeChat?.();
            }
          }}
        >
          <Image
            src={activeChatUserProfile?.contactInfo?.photo!}
            alt=""
            width={10}
            height={10}
            className="rounded-full w-10 h-10 mr-3"
          />
        </Link>
        <div className="flex flex-col">
          <span className="text-lg font-bold">{chatName}</span>
          <span className="text-sm">{lastSeen}</span>
        </div>
      </div>

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
