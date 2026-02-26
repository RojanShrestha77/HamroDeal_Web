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
import { MessageCircle, ChevronRight, PenSquare } from "lucide-react";
import Link from "next/link";

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
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
        <div className="w-7 h-7 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[0.72rem] text-gray-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={11} />
          <span className="text-gray-700 font-medium">Messages</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            {totalUnread > 0 && (
              <span className="bg-black text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                {totalUnread}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-red-400"}`}
              />
              <span className="text-[0.7rem] font-medium text-gray-500">
                {isConnected ? "Online" : "Offline"}
              </span>
            </div>
            <button
              onClick={createTestConversation}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
              title="New conversation"
            >
              <PenSquare size={14} />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <MessageCircle size={24} className="text-gray-400" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">
              No conversations yet
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Start a conversation with a seller or buyer.
            </p>
            <button
              onClick={createTestConversation}
              className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
            >
              New Conversation
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {conversations.map((conv) => {
              const name =
                conv.otherUser.firstName && conv.otherUser.lastName
                  ? `${conv.otherUser.firstName} ${conv.otherUser.lastName}`
                  : conv.otherUser.email;
              const isOnline = isUserOnline(conv.otherUser._id);
              const hasUnread = conv.unreadCount > 0;
              const colorClass = avatarColor(
                conv.otherUser.firstName || conv.otherUser.email,
              );

              const avatarSrc = conv.otherUser.imageUrl
                ? conv.otherUser.imageUrl.startsWith("http")
                  ? conv.otherUser.imageUrl
                  : `http://localhost:5050${conv.otherUser.imageUrl.startsWith("/") ? "" : "/"}${conv.otherUser.imageUrl}`
                : null;

              return (
                <div
                  key={conv._id}
                  onClick={() => router.push(`/messages/${conv._id}`)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    hasUnread
                      ? "bg-gray-50 border-gray-200 hover:border-gray-300"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {/* Avatar — fixed size with overflow hidden, image fully constrained */}
                  <div
                    className="relative shrink-0"
                    style={{ width: 44, height: 44 }}
                  >
                    <div
                      className={`flex items-center justify-center text-sm font-bold ${colorClass}`}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt={name}
                          style={{
                            width: 44,
                            height: 44,
                            objectFit: "cover",
                            borderRadius: "50%",
                            display: "block",
                          }}
                        />
                      ) : (
                        getInitials(conv.otherUser)
                      )}
                    </div>
                    {isOnline && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: 11,
                          height: 11,
                          background: "#34d399",
                          border: "2px solid white",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span
                        className={`text-sm truncate ${hasUnread ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}
                      >
                        {name}
                      </span>
                      {conv.lastMessage && (
                        <span className="text-[0.68rem] text-gray-400 shrink-0">
                          {formatTime(conv.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-xs truncate ${hasUnread ? "text-gray-700" : "text-gray-400"}`}
                      >
                        {conv.lastMessage?.text || "No messages yet"}
                      </p>
                      {hasUnread && (
                        <span className="w-5 h-5 shrink-0 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <ChevronRight
                    size={14}
                    className="text-gray-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
