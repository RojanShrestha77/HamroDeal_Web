"use client";

import {
  getConversationsAction,
  createOrGetConversationAction,
} from "@/lib/actions/conversation.action";
import { useEffect, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Conversation } from "./schema/chat.schema";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/cookies";

const AVATAR_COLORS = [
  "bg-slate-200 text-slate-700",
  "bg-stone-200 text-stone-700",
  "bg-zinc-200 text-zinc-700",
  "bg-neutral-200 text-neutral-700",
];
const avatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (u: {
  firstName?: string;
  lastName?: string;
  email: string;
}) =>
  ((u.firstName?.[0] || u.email[0]) + (u.lastName?.[0] || "")).toUpperCase();

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const { isConnected, isUserOnline } = useSocket(token);

  useEffect(() => {
    const loadToken = async () => {
      const authToken = await getAuthToken();
      setToken(authToken || null);
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (token !== undefined) loadConversations();
  }, [token]);

  const createTestConversation = async () => {
    const otherUserId = prompt("Enter other user ID:");
    if (otherUserId) {
      const result = await createOrGetConversationAction(otherUserId);
      if (result.success) {
        alert("Conversation created!");
        loadConversations();
      } else alert("Error: " + result.message);
    }
  };

  const loadConversations = async () => {
    try {
      setLoading(true);
      const result = await getConversationsAction();
      if (result.success && result.data)
        setConversations(result.data.conversations);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    const diff = Date.now() - date.getTime();
    if (diff < 86400000)
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800" />
        <p className="text-xs text-gray-400">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-gray-800">Messages</h1>
          {totalUnread > 0 && (
            <p className="text-xs text-gray-400">{totalUnread} unread</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-red-400"}`}
          />
          <span className="text-xs font-medium text-gray-500">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">
              No conversations yet
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Start a new conversation
            </p>
            <button
              onClick={createTestConversation}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              New Conversation
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => router.push(`/messages/${conv._id}`)}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent bg-white p-3.5 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${avatarColor(conv.otherUser.firstName || conv.otherUser.email)}`}
                  >
                    {conv.otherUser.imageUrl ? (
                      <img
                        src={
                          conv.otherUser.imageUrl.startsWith("http")
                            ? conv.otherUser.imageUrl
                            : `http://localhost:5050${conv.otherUser.imageUrl.startsWith("/") ? "" : "/"}${conv.otherUser.imageUrl}`
                        }
                        alt={conv.otherUser.firstName || "User"}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      getInitials(conv.otherUser)
                    )}
                  </div>
                  {isUserOnline(conv.otherUser._id) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`truncate text-sm ${conv.unreadCount > 0 ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}
                    >
                      {conv.otherUser.firstName && conv.otherUser.lastName
                        ? `${conv.otherUser.firstName} ${conv.otherUser.lastName}`
                        : conv.otherUser.email}
                    </span>
                    {conv.lastMessage && (
                      <span className="ml-2 flex-shrink-0 text-xs text-gray-400">
                        {formatTime(conv.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-xs ${conv.unreadCount > 0 ? "text-gray-700" : "text-gray-400"}`}
                    >
                      {conv.lastMessage?.text || "No messages yet"}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
