import { SidebarInset } from "../ui/sidebar";

const ChatWindowSkeleton = () => {
  return (
    <SidebarInset className="flex w-full h-full bg-transparent animate-pulse">
      <div className="flex bg-primary-foreground rounded-2xl flex-1 items-center justify-center">
        <div className="text-center space-y-4">
          <div className="size-42 mx-auto mb-6 bg-muted rounded-full shadow-inner" />
          <div className="w-96 h-10 bg-muted rounded mx-auto" />
          <div className="w-72 h-8 bg-muted rounded mx-auto" />
        </div>
      </div>
    </SidebarInset>
  );
};

export default ChatWindowSkeleton;
