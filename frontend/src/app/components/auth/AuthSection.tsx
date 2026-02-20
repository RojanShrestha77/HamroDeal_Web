"use client";

import { useAuth } from "@/context/AuthContext";
import {
  User,
  ChevronDown,
  LogOut,
  FileText,
  UserCircle,
  ShoppingBag,
  LayoutDashboard,
  BookOpen,
  Store,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function AuthSection() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer px-2.5 py-1.5 rounded-lg border-none bg-transparent hover:bg-[#f4f4f4] transition-colors duration-150"
      >
        {/* Avatar with User icon */}
        <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center flex-shrink-0">
          <User size={16} />
        </div>

        {/* Name */}
        <div className="flex flex-col items-start">
          <span className="text-[0.68rem] text-[#999] leading-none">
            Hello,
          </span>
          <span className="text-[0.82rem] font-semibold text-[#1a1a1a] leading-snug">
            {user.username}
          </span>
        </div>

        <ChevronDown
          size={13}
          className={`text-[#aaa] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white border border-[#ebebeb] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-[300] overflow-hidden animate-[pop_0.15s_ease]">
          <style>{`@keyframes pop { from { opacity:0; transform: translateY(-6px) scale(0.98); } to { opacity:1; transform: translateY(0) scale(1); } }`}</style>

          {/* Header */}
          <div className="px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
            <div className="text-sm font-semibold text-[#1a1a1a]">
              {user.username}
            </div>
            <div className="text-[0.72rem] text-[#aaa] mt-0.5 capitalize">
              {user.role || "Customer"}
            </div>
          </div>

          {/* Menu */}
          <div className="py-1.5">
            <Link
              href="/user/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#444] no-underline hover:bg-[#f8f7f4] hover:text-[#1a1a1a] [&:hover_svg]:text-[#e85d26] transition-colors duration-150"
            >
              <UserCircle
                size={15}
                className="text-[#aaa] flex-shrink-0 transition-colors duration-150"
              />{" "}
              My Profile
            </Link>
            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#444] no-underline hover:bg-[#f8f7f4] hover:text-[#1a1a1a] [&:hover_svg]:text-[#e85d26] transition-colors duration-150"
            >
              <ShoppingBag
                size={15}
                className="text-[#aaa] flex-shrink-0 transition-colors duration-150"
              />{" "}
              My Orders
            </Link>
            <Link
              href="/my-blogs"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#444] no-underline hover:bg-[#f8f7f4] hover:text-[#1a1a1a] [&:hover_svg]:text-[#e85d26] transition-colors duration-150"
            >
              <FileText
                size={15}
                className="text-[#aaa] flex-shrink-0 transition-colors duration-150"
              />{" "}
              My Blogs
            </Link>

            {/* Admin links */}
            {user.role === "admin" && (
              <>
                <div className="h-px bg-[#f0f0f0] my-1" />
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#444] no-underline hover:bg-[#f8f7f4] hover:text-[#1a1a1a] [&:hover_svg]:text-[#e85d26] transition-colors duration-150"
                >
                  <LayoutDashboard
                    size={15}
                    className="text-[#aaa] flex-shrink-0 transition-colors duration-150"
                  />{" "}
                  Admin Dashboard
                </Link>
                <Link
                  href="/admin/blogs"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#444] no-underline hover:bg-[#f8f7f4] hover:text-[#1a1a1a] [&:hover_svg]:text-[#e85d26] transition-colors duration-150"
                >
                  <BookOpen
                    size={15}
                    className="text-[#aaa] flex-shrink-0 transition-colors duration-150"
                  />{" "}
                  Manage Blogs
                </Link>
              </>
            )}

            {/* Seller links */}
            {user.role === "seller" && (
              <>
                <div className="h-px bg-[#f0f0f0] my-1" />
                <Link
                  href="/seller"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#444] no-underline hover:bg-[#f8f7f4] hover:text-[#1a1a1a] [&:hover_svg]:text-[#e85d26] transition-colors duration-150"
                >
                  <Store
                    size={15}
                    className="text-[#aaa] flex-shrink-0 transition-colors duration-150"
                  />{" "}
                  Seller Dashboard
                </Link>
              </>
            )}

            <div className="h-px bg-[#f0f0f0] my-1" />
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#e85d26] bg-none border-none cursor-pointer hover:bg-[#fff4f0] hover:text-[#c94d1a] transition-colors duration-150 text-left"
            >
              <LogOut size={15} className="flex-shrink-0" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
