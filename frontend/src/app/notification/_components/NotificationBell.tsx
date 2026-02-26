"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axiosInstance from "@/lib/api/axios";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [pathname]);

  const loadUnreadCount = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/notifications/unread-count",
      );

      if (response.data.success) {
        const count = response.data.data?.count || 0;
        setUnreadCount(count);
      }
    } catch (error) {}
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
