"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Conversation, Message } from "../schema/chat.schema";
import { useSocket } from "../../../../hooks/useSocket";
import { getConversationByIdAction } from "@/lib/actions/conversation.action";
import { getMessagesAction } from "@/lib/actions/message.action";
import { timeStamp } from "console";
import { getAuthToken, getUserData } from "@/lib/cookies";

export default function chatRoomPage() {
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
    // Get token and user from cookies
    const loadAuth = async () => {
      const storedToken = await getAuthToken();
      const userData = await getUserData();

      if (userData) {
        setCurrentUserId(userData._id);
      }

      setToken(storedToken || null);
    };

    loadAuth();
    loadConversation();
    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    if (!socket) return;

    // listen fro new mess
    socket.on("new_message", (message: Message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();

        markAsRead(conversationId);
      }
    });

    // listen fior message delivered
    socket.on("message_delviered", ({ messageId, conversationId: convId }) => {
      if (convId === conversationId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === messageId ? { ...msg, status: "delivered" } : msg,
          ),
        );
      }
    });

    // Listen for messages read
    socket.on("messages_read", ({ conversationId: convId }) => {
      if (convId === conversationId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.status !== "read" ? { ...msg, status: "read" } : msg,
          ),
        );
      }
    });

    // Listen for typing
    socket.on("user_typing", ({ conversationId: convId }) => {
      if (convId === conversationId) {
        setIsTyping(true);
      }
    });

    // Listen for stop typing
    socket.on("user_stop_typing", ({ conversationId: convId }) => {
      if (convId === conversationId) {
        setIsTyping(false);
      }
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
      console.log("Loading conversation:", conversationId); // ← Add this
      const result = await getConversationByIdAction(conversationId);
      console.log("Conversation result:", result); // ← Add this

      if (result.success && result.data) {
        setConversation(result.data);
      } else {
        console.error("Failed to load conversation:", result.message); // ← Add this
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const result = await getMessagesAction(conversationId);

      if (result.success && result.data) {
        setMessages(result.data.messages);
      }
    } catch (error) {
      console.error("Failed to laod messages: ", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText.trim() || sending) return;

    setSending(true);

    // send via socket for real-time
    if (socket && isConnected) {
      sendMessage(conversationId, messageText.trim(), (response) => {
        if (response.success && response.message) {
          setMessages((prev) => [...prev, response.message!]);
          setMessageText("");
          scrollToBottom();

          if (conversation?.otherUser._id) {
            emitStopTyping(conversationId, conversation.otherUser._id);
          }
        } else {
          alert("Failed to send message: " + response.error);
        }
        setSending(false);
      });
    } else {
      alert("Not conected to chat server");
      setSending(false);
    }
  };

  const handleTyping = () => {
    if (!conversation?.otherUser._id) return;

    // emit typing event
    emitTyping(conversationId, conversation.otherUser._id);

    // clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // set timeout to stop typing after 2 sec
    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping(conversationId, conversation.otherUser._id);
    }, 2000);
  };

  const formatTime = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return date.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (staus: string) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading messages...</div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Conversation not found</div>
      </div>
    );
  }

  const otherUser = conversation?.otherUser;
  if (!otherUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Invalid conversation data</div>
      </div>
    );
  }

  const isOnline = isUserOnline(otherUser._id);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.push("/messages")}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>

        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {otherUser.imageUrl ? (
              <img
                src={otherUser.imageUrl}
                alt={otherUser.firstName || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-600">
                {(otherUser.firstName?.[0] || otherUser.email[0]).toUpperCase()}
              </span>
            )}
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        <div>
          <h2>
            {otherUser.firstName && otherUser.lastName
              ? `${otherUser.firstName} ${otherUser.lastName}`
              : otherUser.email}
          </h2>
          <p className="text-xs text-gray-500">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        <div
          className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isSentByMe = message.senderId._id === currentUserId;

              return (
                <div
                  key={message._id}
                  className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isSentByMe
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        isSentByMe ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      <span>{formatTime(message.createdAt)}</span>
                      {isSentByMe && (
                        <span
                          className={
                            message.status === "read" ? "text-blue-200" : ""
                          }
                        >
                          {getStatusIcon(message.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* typing indicator */}
        {isTyping && (
          <div className="flex justify-start mt-2">
            <div className="bg-white px-4 py-2 rounded-lg text-gray-500 text-sm">
              {otherUser.firstName || "User"} is typing...
            </div>
          </div>
        )}
      </div>

      {/* message input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sending || !isConnected}
          />
          <button
            type="submit"
            disabled={!messageText.trim() || sending || !isConnected}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {sending ? "sending..." : "send"}
          </button>
        </form>
        {!isConnected && (
          <p className="text-xs text-red-500 mt-2">
            Not connected to chat server. Please refresh the page.
          </p>
        )}
      </div>
    </div>
  );
}
