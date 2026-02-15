"use client";

import { useAuth } from "@/context/AuthContext";
import { User, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AuthSection() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5 text-neutral-700" />
        <div className="flex flex-col">
          <span className="text-xs text-neutral-600">
            Hello {user.username}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-neutral-900">
              My Account
            </span>
            <ChevronDown
              className={`w-3 h-3 text-neutral-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
