"use client";

import { getUnreadCountAction } from "@/lib/actions/notification.action";
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
    <Link 
      href="/notification" 
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent hover:bg-[#F5F5F7] transition-colors duration-150"
    >
      <Bell size={20} className="text-[#1D1D1F]" strokeWidth={1.8} />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF3B30] px-1 text-[10px] font-semibold text-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
