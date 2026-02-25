"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Conversation, Message } from "../schema/chat.schema";
import { useSocket } from "../../../../hooks/useSocket";
import { getConversationByIdAction } from "@/lib/actions/conversation.action";
import { getMessagesAction } from "@/lib/actions/message.action";
import { getAuthToken, getUserData } from "@/lib/cookies";

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

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "sent") return <span className="opacity-50">✓</span>;
  if (status === "delivered") return <span className="opacity-50">✓✓</span>;
  if (status === "read") return <span className="text-blue-300">✓✓</span>;
  return null;
};

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    socket,
    isConnected,
    sendMessage,
    markAsRead,
    emitTyping,
    emitStopTyping,
    isUserOnline,
  } = useSocket(token);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await getAuthToken();
      const userData = await getUserData();
      if (userData) setCurrentUserId(userData._id);
      setToken(storedToken || null);
    };
    loadAuth();
    loadConversation();
    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    if (!socket) return;
    socket.on("new_message", (message: Message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
        markAsRead(conversationId);
      }
    });
    socket.on("message_delviered", ({ messageId, conversationId: convId }) => {
      if (convId === conversationId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === messageId ? { ...msg, status: "delivered" } : msg,
          ),
        );
      }
    });
    socket.on("messages_read", ({ conversationId: convId }) => {
      if (convId === conversationId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.status !== "read" ? { ...msg, status: "read" } : msg,
          ),
        );
      }
    });
    socket.on("user_typing", ({ conversationId: convId }) => {
      if (convId === conversationId) setIsTyping(true);
    });
    socket.on("user_stop_typing", ({ conversationId: convId }) => {
      if (convId === conversationId) setIsTyping(false);
    });
    return () => {
      socket.off("new_message");
      socket.off("message_delivered");
      socket.off("messages_read");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [socket, conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversation = async () => {
    try {
      const result = await getConversationByIdAction(conversationId);
      if (result.success && result.data) setConversation(result.data);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const result = await getMessagesAction(conversationId);
      if (result.success && result.data) setMessages(result.data.messages);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || sending) return;
    setSending(true);
    if (socket && isConnected) {
      sendMessage(conversationId, messageText.trim(), (response) => {
        if (response.success && response.message) {
          setMessages((prev) => [...prev, response.message!]);
          setMessageText("");
          scrollToBottom();
          if (conversation?.otherUser._id)
            emitStopTyping(conversationId, conversation.otherUser._id);
        } else alert("Failed to send message: " + response.error);
        setSending(false);
      });
    } else {
      alert("Not connected to chat server");
      setSending(false);
    }
  };

  const handleTyping = () => {
    if (!conversation?.otherUser._id) return;
    emitTyping(conversationId, conversation.otherUser._id);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping(conversationId, conversation.otherUser._id);
    }, 2000);
  };

  const formatMsgTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800" />
        <p className="text-xs text-gray-400">Loading messages...</p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-gray-500">Conversation not found</p>
      </div>
    );
  }

  const otherUser = conversation.otherUser;
  if (!otherUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-gray-500">Invalid conversation data</p>
      </div>
    );
  }

  const isOnline = isUserOnline(otherUser._id);

  return (
    <div className="flex h-screen max-w-4xl mx-auto flex-col bg-slate-50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 shadow-sm">
        <button
          onClick={() => router.push("/messages")}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="relative flex-shrink-0">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${avatarColor(otherUser.firstName || otherUser.email)}`}
          >
            {otherUser.imageUrl ? (
              <img
                src={
                  otherUser.imageUrl.startsWith("http")
                    ? otherUser.imageUrl
                    : `http://localhost:5050${otherUser.imageUrl.startsWith("/") ? "" : "/"}${otherUser.imageUrl}`
                }
                alt={otherUser.firstName || "User"}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              getInitials(otherUser)
            )}
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-gray-800">
            {otherUser.firstName && otherUser.lastName
              ? `${otherUser.firstName} ${otherUser.lastName}`
              : otherUser.email}
          </h2>
          <p
            className={`text-xs ${isOnline ? "text-emerald-500" : "text-gray-400"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-red-400"}`}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-gray-400">No messages yet</p>
            <p className="mt-1 text-xs text-gray-300">
              Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isSentByMe = message.senderId._id === currentUserId;
            return (
              <div
                key={message._id}
                className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
              >
                {!isSentByMe && (
                  <div
                    className={`mr-2 mt-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarColor(otherUser.firstName || otherUser.email)}`}
                  >
                    {getInitials(otherUser)}
                  </div>
                )}
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2.5 lg:max-w-md ${
                    isSentByMe
                      ? "rounded-br-sm bg-gray-900 text-white"
                      : "rounded-bl-sm border border-gray-100 bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="break-words text-sm leading-relaxed">
                    {message.text}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-gray-400">
                    <span>{formatMsgTime(message.createdAt)}</span>
                    {isSentByMe && <StatusIcon status={message.status} />}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarColor(otherUser.firstName || otherUser.email)}`}
            >
              {getInitials(otherUser)}
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-2.5 shadow-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 bg-white p-3">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            disabled={sending || !isConnected}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 transition-colors focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!messageText.trim() || sending || !isConnected}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm transition-all hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            {sending ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            )}
          </button>
        </form>
        {!isConnected && (
          <p className="mt-2 text-center text-xs text-gray-400">
            Not connected · Please refresh
          </p>
        )}
      </div>
    </div>
  );
}
