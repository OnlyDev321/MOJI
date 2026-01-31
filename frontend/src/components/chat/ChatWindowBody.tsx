import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import MessageItem from "./MessageItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import InfiniteScroll from "react-infinite-scroll-component";

const ChatWindowBody = () => {
  const {
    activeConversationId,
    conversations,
    messages: allMessages,
    fetchMessages,
    scrollPositions,
    setScrollPosition,
  } = useChatStore();
  const { user } = useAuthStore();

  const [lastMessageStatus, setLastMessageStatus] = useState<
    "Delivered" | "Seen"
  >("Delivered");

  const messages = allMessages[activeConversationId!]?.items ?? [];
  const reversedMessages = [...messages].reverse();
  const hasMore = allMessages[activeConversationId!]?.hasMore ?? false;
  const selectedConvo = conversations.find(
    (c) => c._id === activeConversationId
  );
  // Remove key since we use store
  // const key = `chat-scroll-${activeConversationId}`;

  //ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage = selectedConvo?.lastMessage;
    if (!lastMessage || !user?._id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastMessageStatus("Delivered");
      return;
    }

    const seenBy = selectedConvo?.seenBy ?? [];

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastMessageStatus(seenBy.length > 0 ? "Seen" : "Delivered");
  }, [selectedConvo]);

  const isInitialLoad = useRef(true);

  useEffect(() => {
    isInitialLoad.current = true;
  }, [activeConversationId]);

  //scroll logic
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!messagesEndRef.current || !container || !activeConversationId) {
      return;
    }

    if (isInitialLoad.current) {
      const savedPosition = scrollPositions[activeConversationId];
      if (savedPosition && messages.length > 0) {
        container.scrollTop = savedPosition;
      } else {
        messagesEndRef.current.scrollIntoView({
          behavior: "instant", // Use instant for initial load to prevent viewing jump
          block: "end",
        });
      }
      isInitialLoad.current = false;
    }
  }, [activeConversationId, messages.length, scrollPositions]);

  const fetchMoreMessages = async () => {
    if (!activeConversationId) {
      return;
    }
    try {
      // Save current scroll height before fetching to maintain position if needed
      // Actually standard infinite scroll handles this via 'inverse' prop usually
      await fetchMessages(activeConversationId);
    } catch (error) {
      console.error("ERROR when fetchMoreMessages", error);
    }
  };

  const handleScrollSave = () => {
    const container = containerRef.current;
    if (!container || !activeConversationId) {
      return;
    }

    setScrollPosition(activeConversationId, container.scrollTop);
  };
 
  // Restore scroll position logic is now merged into the main useLayoutEffect above
  // We remove the separate sessionStorage useEffects

  if (!selectedConvo) {
    return <ChatWelcomeScreen />;
  }

  if (!messages?.length) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Not messages in this conversation.
      </div>
    );
  }

  return (
    <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div
        id="scrollableDiv"
        ref={containerRef}
        onScroll={handleScrollSave}
        className="flex flex-col-reverse overflow-y-auto overflow-x-hidden beautiful-scrollbar"
      >
        <div ref={messagesEndRef}></div>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreMessages}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          loader={<p>Loading...</p>}
          inverse={true}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "visible",
          }}
        >
          {reversedMessages.map((message, index) => (
            <MessageItem
              key={message._id ?? index}
              message={message}
              index={index}
              messages={reversedMessages}
              selectedConvo={selectedConvo}
              lastMessageStatus={lastMessageStatus}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatWindowBody;
