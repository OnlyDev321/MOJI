import type { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";

interface InviteSuggestionListProps {
  filteredFriends: Friend[];
  onSelect: (friend: Friend) => void;
}

const InviteSuggestionList = ({
  filteredFriends,
  onSelect,
}: InviteSuggestionListProps) => {
  if (filteredFriends.length === 0) {
    return;
  }

  return (
    <div className="border rounded-lg mt-2 max-h-45 overflow-y-auto divide-y">
      {filteredFriends.map((friend) => (
        <div
          key={friend._id}
          className="flex items-center gap-3 p-2 cursor-pointer hover:bg-muted transition"
          onClick={() => onSelect(friend)}
        >
          <UserAvatar
            type="chat"
            name={friend.displayName}
            avatarUrl={friend.avatarUrl}
          />

          <span className="font-medium">{friend.displayName}</span>
        </div>
      ))}
    </div>
  );
};

export default InviteSuggestionList;
