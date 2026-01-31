import { Badge } from "../ui/badge";

const UnreadCountBadge = ({ unreadCount }: { unreadCount: number }) => {
  return (
    <div className="pulse-ring absolute z-20 -top-1 -right-1">
      <Badge
        variant="destructive"
        className="size-5 flex items-center justify-center p-0 text-xs bg-gradient-chat border border-background"
      >
        {unreadCount > 9 ? "9+" : unreadCount}
      </Badge>
    </div>
  );
};

export default UnreadCountBadge;
