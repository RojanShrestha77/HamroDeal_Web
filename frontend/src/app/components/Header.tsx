"use client";
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavouriteButton from "./FavouriteButton";
import MobileMenu from "./MobileMenu";
import Link from "next/dist/client/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div>
          <Link href="/user/profile">My Profile</Link>
        </div>
        <div>{user?.role === "admin" && <Link href="/admin">admin</Link>}</div>
        <div>
          {user?.role === "seller" && <Link href="/seller">seller</Link>}
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavouriteButton />
          <div>
            <Link href="/login">
              <button>SignIn</button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
