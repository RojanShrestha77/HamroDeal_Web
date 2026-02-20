"use client";
import React from "react";
import Container from "../common/Container";
import Logo from "../navigation/Logo";
import HeaderSearchBar from "./HeaderSearchBar";
import CartIcon from "../common/CartIcon";
import FavouriteButton from "../../wishlist/_components/FavouriteButton";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "../navigation/MobileMenu";
import AuthSection from "../auth/AuthSection";
import Link from "next/link";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 py-3 bg-white/70 backdrop-blur-md border-b border-neutral-100">
      <Container>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <MobileMenu />
            <Logo />
          </div>

          {/*Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-sm mx-auto">
            <HeaderSearchBar />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <CartIcon />
            <FavouriteButton />
            {user ? (
              <AuthSection />
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar on mobile  */}
        <div className="sm:hidden mt-2">
          <HeaderSearchBar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
