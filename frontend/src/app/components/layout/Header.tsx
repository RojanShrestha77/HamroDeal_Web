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

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      style={{ borderBottom: "0.5px solid #333333" }}
    >
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
              <AuthSection />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
