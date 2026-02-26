"use client";
import React from "react";
import Container from "../common/Container";
import Logo from "../navigation/Logo";
import HeaderSearchBar from "./HeaderSearchBar";
import CartIcon from "../common/CartIcon";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "../navigation/MobileMenu";
import AuthSection from "../auth/AuthSection";
import Link from "next/link";
import NotificationBell from "@/app/notification/_components/NotificationBell";
import ChatIcon from "@/app/messages/_components/ChatIcon";

const Header = () => {
  const { user } = useAuth();
  const [showAuthDropdown, setShowAuthDropdown] = React.useState(false);
  const authDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        authDropdownRef.current &&
        !authDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAuthDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#F5F5F7] shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Logo & Mobile Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <MobileMenu />
            <Logo />
          </div>

          <div className="flex-1 max-w-2xl">
            <HeaderSearchBar />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <CartIcon />

            <NotificationBell />

            <ChatIcon />

            {user ? (
              <AuthSection />
            ) : (
              <div className="relative hidden sm:block" ref={authDropdownRef}>
                <button
                  onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-lg transition-colors whitespace-nowrap"
                >
                  Sign In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${showAuthDropdown ? "rotate-180" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {showAuthDropdown && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-[180px] bg-white border border-[#F5F5F7] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-[300] overflow-hidden animate-[pop_0.15s_ease]">
                    <style>{`@keyframes pop { from { opacity:0; transform: translateY(-6px) scale(0.98); } to { opacity:1; transform: translateY(0) scale(1); } }`}</style>
                    <div className="py-1.5">
                      <Link
                        href="/login"
                        onClick={() => setShowAuthDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#1D1D1F] no-underline hover:bg-[#F5F5F7] hover:text-[#0071E3] transition-colors duration-150"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setShowAuthDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[0.855rem] text-[#1D1D1F] no-underline hover:bg-[#F5F5F7] hover:text-[#0071E3] transition-colors duration-150"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
