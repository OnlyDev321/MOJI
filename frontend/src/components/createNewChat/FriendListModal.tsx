import { useFriendStore } from "@/stores/useFriendStore";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { MessageCircleMore, Users } from "lucide-react";
import { Card } from "../ui/card";
import UserAvatar from "../chat/UserAvatar";
import { useChatStore } from "@/stores/useChatStore";

const FriendListModal = () => {
  const { friends } = useFriendStore();
  const {
    createConversation,
    fetchConversations,
    conversations,
    setActiveConversation,
    fetchMessages,
  } = useChatStore();

  const handleAddConversation = async (friendId: string) => {
    try {
      const existingConversation = conversations.find(
        (c) =>
          c.type === "direct" &&
          c.participants.some((p) => p._id === friendId)
      );

      if (existingConversation) {
        setActiveConversation(existingConversation._id);
        await fetchMessages(existingConversation._id);
      } else {
        await createConversation("direct", "", [friendId]);
        await fetchConversations();
      }
    } catch (error) {
      console.error("Failed to create or fetch conversations:", error);
    }
  };

  return (
    <DialogContent className="glass max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl capitalize">
          <MessageCircleMore className="size-5" />
          Start New Conversation!
        </DialogTitle>
        <DialogDescription className="sr-only">
          List of friends to start a conversation with
        </DialogDescription>
      </DialogHeader>

      {/* friends list  */}
      <div className="space-y-4">
        <h1 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          List Friends
        </h1>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {friends.map((friend) => (
            <Card
              key={friend._id}
              onClick={() => handleAddConversation(friend._id)}
              className="p-3 cursor-pointer transition-smooth hover:shadow-soft glass hover:bg-muted/30 group/friendCard mt-2"
            >
              <div className="flex items-center gap-3">
                {/* avatar  */}
                <div className="relative">
                  <UserAvatar
                    type="sidebar"
                    name={friend.displayName}
                    avatarUrl={friend.avatarUrl}
                  />
                </div>

                {/* info  */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <h2 className="font-semibold text-sm truncate">
                    {friend.displayName}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    @{friend.username}
                  </span>
                </div>
              </div>
            </Card>
          ))}

          {friends.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="size-12 mx-auto mb-3 opacity-50" />
              Have't friends yet. Add friend to talk!
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default FriendListModal;
