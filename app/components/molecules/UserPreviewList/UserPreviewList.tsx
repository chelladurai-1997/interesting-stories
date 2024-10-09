import { Profile } from "@/app/profiles/profile.types";
import { CloseIcon } from "../../icons/CloseIcon";
import { UserPreviewItem } from "../UserPreviewItem/UserPreviewItem";
import { ProfileListItem } from "../../organism/ProfileList/useProfileList";

type UserPreviewListProps = {
  chatPreviewUsers: ProfileListItem[];
  closePreviewList: () => void;
  showChatInterface: (name: string, receiverUserId: string) => void;
};

export const UserPreviewList: React.FC<UserPreviewListProps> = ({
  chatPreviewUsers,
  closePreviewList,
  showChatInterface,
}) => (
  <div className="fixed top-0 right-0 h-full flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto z-40 bg-white">
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <h2 className="text-lg font-bold">Messages</h2>
      <button onClick={closePreviewList} className="text-red-500">
        <CloseIcon />
      </button>
    </div>
    <div className="overflow-y-auto flex-1">
      {chatPreviewUsers.map((user, index) => (
        <UserPreviewItem
          key={index}
          user={user}
          showChatInterface={showChatInterface}
        />
      ))}
    </div>
  </div>
);
