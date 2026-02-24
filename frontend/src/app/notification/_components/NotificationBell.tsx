import { getUnreadCountAction } from "@/lib/actions/notification.action";
import { getUnreadCount } from "@/lib/api/notification";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUnreadCount();

    const interval = setInterval(loadUnreadCount, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    const result = await getUnreadCountAction();
    if (result.success) {
      setUnreadCount(result.count);
    }
  };

  return (
    <Link href="/notification" className="relative inline-block">
      <Bell className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
