import { ProfileListItem } from "../../organism/ProfileList/useProfileList";

// Define User type for the preview list
type User = {
  userId: string; // Add userId to uniquely identify the user
  name: string;
  lastMessage: string;
  lastSeen: string;
};

export const UserPreviewItem: React.FC<{
  user: ProfileListItem;
  showChatInterface: (name: string, receiverUserId: string) => void;
}> = ({ user, showChatInterface }) => (
  <div
    className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
    onClick={() => showChatInterface(user?.name, user?.userId)}
  >
    <div className="flex justify-between">
      <div>
        <span className="font-bold">{user.name}</span>
        <p className="text-sm">Open the chat to check for new messages.</p>
      </div>
      {/* <span className="text-xs text-gray-500">{"Just start!"}</span> */}
    </div>
  </div>
);
