import { getConversationsAction } from "@/lib/actions/conversation.action";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Conversation } from "./schema/chat.schema";

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const { isConnected, isUserOnline } = useSocket(token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const result = await getConversationsAction();

      if (result.success && result.data) {
        setConversations(result.data.conversations);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Messages</h1>
        <div>
          <div
            className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
          />
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No Conversations yet
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => router.push(`/messages.${conversation._id}`)}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition"
            >
              {/* avatar */}
              <div>
                <div>
                  {conversation.otherUser.imageUrl ? (
                    <img />
                  ) : (
                    <span>
                      {(
                        conversation.otherUser.firstName?.[0] ||
                        conversation.otherUser.email[0]
                      ).toUpperCase()}
                    </span>
                  )}
                </div>
                {/* online indicator */}
                {isUserOnline(conversation.otherUser._id) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* content */}
              <div>
                <div>
                  <h3 className="font-semibold truncate">
                    {conversation.otherUser.firstName &&
                    conversation.otherUser.lastName
                      ? `${conversation.otherUser.firstName} ${conversation.otherUser.lastName}`
                      : conversation.otherUser.email}
                  </h3>
                  {conversation.lastMessage && (
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                <div>
                  <p>{conversation.lastMessage?.text || "No messages yet"}</p>
                  {conversation.unreadCount > 0 && (
                    <span>{conversation.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
