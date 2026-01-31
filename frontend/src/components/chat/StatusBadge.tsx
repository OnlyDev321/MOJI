import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: "online" | "offline" }) => {
  return (
    <div
      className={cn(
        "absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-card",
        status === "online" && "status-online",
        status === "offline" && "status-offline"
      )}
    ></div>
  );
};

export default StatusBadge;
