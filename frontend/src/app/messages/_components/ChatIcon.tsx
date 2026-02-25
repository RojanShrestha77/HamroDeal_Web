"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getConversationsAction } from "@/lib/actions/conversation.action";
import { useSocket } from "../../../../hooks/useSocket";
import { Conversation } from "../schema/chat.schema";
import { getAuthToken } from "@/lib/cookies";
import { Mail, MessageCircle, MessageSquare, Send } from "lucide-react";

export default function ChatIcon() {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const { socket } = useSocket(token);

  useEffect(() => {
    const loadToken = async () => {
      const authToken = await getAuthToken();
      setToken(authToken || null);
      if (authToken) loadUnreadCount();
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("new_message", () => {
      loadUnreadCount();
    });
    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  const loadUnreadCount = async () => {
    try {
      const result = await getConversationsAction();
      if (result.success && result.data) {
        const total = result.data.conversations.reduce(
          (sum: number, conv: Conversation) => sum + conv.unreadCount,
          0,
        );
        setUnreadCount(total);
      }
    } catch (error) {
      console.error("Failed to load unread count:", error);
    }
  };

  return (
    <button
      onClick={() => router.push("/messages")}
      aria-label="Messages"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent hover:bg-[#F5F5F7] transition-colors duration-150"
    >
      <Send size={20} className="text-[#1D1D1F]" strokeWidth={1.8} />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF3B30] px-1 text-[10px] font-semibold text-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}
