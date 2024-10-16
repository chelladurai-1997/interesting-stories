// ChatHeader.tsx
import Link from "next/link";
import Image from "next/image";
import { Profile } from "@/app/profiles/profile.types";
import { usePathname } from "next/navigation";
import { BackArrowIcon } from "@/app/components/icons/BackArrowIcon";

interface ChatHeaderProps {
  chatName: string;
  lastSeen: string;
  showingChatUserId: string;
  activeChatUserProfile: Profile | null;
  backToChatList: () => void;
  closeChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  chatName,
  lastSeen,
  showingChatUserId,
  activeChatUserProfile,
  backToChatList,
  closeChat,
}) => {
  const pathname = usePathname();
  const profileDetailHref = "/profiles/" + showingChatUserId;

  return (
    <div className="bg-green-600 text-white p-4 flex items-center sticky top-0 z-50">
      <button className="text-white mr-3" onClick={backToChatList}>
        <BackArrowIcon />
      </button>
      <Link
        href={profileDetailHref}
        onClick={() => {
          if (pathname === profileDetailHref) {
            closeChat();
          }
        }}
      >
        <Image
          src={
            activeChatUserProfile?.contactInfo?.photo || "/default-profile.png"
          } // Fallback to default image
          alt={`${chatName}'s profile photo`}
          width={40} // Adjusted the width and height
          height={40}
          className="rounded-full w-10 h-10 mr-3"
        />
      </Link>
      <div className="flex flex-col">
        <span className="text-lg font-bold">{chatName}</span>
        <span className="text-sm">{lastSeen}</span>
      </div>
    </div>
  );
};
