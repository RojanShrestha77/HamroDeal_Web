"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getConversationsAction } from "@/lib/actions/conversation.action";
import { useSocket } from "../../../../hooks/useSocket";
import { Conversation } from "../schema/chat.schema";
import { getAuthToken } from "@/lib/cookies";
export default function ChatIcon() {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [token, setToken] = useState<string | null>(null);

  const { socket } = useSocket(token);

  useEffect(() => {
    // Get token from cookies instead of localStorage
    const loadToken = async () => {
      const authToken = await getAuthToken();
      setToken(authToken || null);

      if (authToken) {
        loadUnreadCount();
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages to update unread count
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

  const handleClick = () => {
    router.push("/messages");
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-gray-600 hover:text-gray-800 transition"
      aria-label="Messages"
    >
      {/* Chat Icon SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}
