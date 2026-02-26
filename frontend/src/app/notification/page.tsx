"use client";

import {
  deleteNotificationAction,
  getNotificationsAction,
  markAllNotificationsAsReadAction,
  markNotificationAsReadAction,
} from "@/lib/actions/notification.action";
import { useEffect, useState } from "react";
import { Notification } from "./schema/notification.schema";
import {
  Bell,
  Trash2,
  CheckCheck,
  Package,
  ShoppingCart,
  Tag,
  Info,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const getNotificationIcon = (type?: string) => {
  switch (type) {
    case "order":
      return <Package size={15} />;
    case "cart":
      return <ShoppingCart size={15} />;
    case "promo":
      return <Tag size={15} />;
    default:
      return <Bell size={15} />;
  }
};

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const result = await getNotificationsAction(1, 50);
    if (result.success) setNotifications(result.data);
    setLoading(false);
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllNotificationsAsReadAction();
    if (result.success) loadNotifications();
  };

  const handleDelete = async (notificationId: string) => {
    const result = await deleteNotificationAction(notificationId);
    if (result.success) loadNotifications();
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead)
      await markNotificationAsReadAction(notification._id);
    if (notification.actionUrl) router.push(notification.actionUrl);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
          <span className="text-gray-700 font-medium">Notifications</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-black text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
            >
              <CheckCheck size={13} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Empty state */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Bell size={24} className="text-gray-400" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">
              No notifications yet
            </h2>
            <p className="text-sm text-gray-400">
              We'll let you know when something comes up.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  notification.isRead
                    ? "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    notification.isRead
                      ? "bg-gray-100 text-gray-500"
                      : "bg-black text-white"
                  }`}
                >
                  {getNotificationIcon((notification as any).type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <p
                        className={`text-sm leading-snug truncate ${notification.isRead ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}
                      >
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <span className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                      )}
                    </div>
                    <span className="text-[0.68rem] text-gray-400 shrink-0 mt-0.5">
                      {getTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-[0.78rem] text-gray-500 mt-0.5 leading-relaxed">
                    {notification.message}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification._id);
                  }}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
