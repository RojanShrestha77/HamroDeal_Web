"use client";

import {
  deleteNotificationAction,
  getNotificationsAction,
  markAllNotificationsAsReadAction,
  markNotificationAsReadAction,
} from "@/lib/actions/notification.action";
import { useEffect, useState } from "react";
import { Notification } from "./schema/notification.schema";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

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
    if (result.success) {
      setNotifications(result.data);
    }
    setLoading(false);
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllNotificationsAsReadAction();
    if (result.success) {
      loadNotifications();
    }
  };

  const handleDelete = async (notificationId: string) => {
    const result = await deleteNotificationAction(notificationId);
    if (result.success) {
      loadNotifications();
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markNotificationAsReadAction(notification._id);
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
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

  if (loading) {
    return (
      <div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Notifications</h1>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div>
          <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p> No notifications yet</p>
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                notification.isRead
                  ? "bg-white hover:bg-gray-50"
                  : "bg-blue-50 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div>
                <div>
                  <div>
                    <h3>{notification.title}</h3>
                    {!notification.isRead && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification._id);
                  }}
                  className="text-red-500 hover:text-red-700 ml-4 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
