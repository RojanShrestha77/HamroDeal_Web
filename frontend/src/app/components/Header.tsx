"use client";
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavouriteButton from "../wishlist/_components/FavouriteButton";
import Link from "next/dist/client/link";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "./MobileMenu";

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
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link href="/my-blogs" className="hover:text-shop_light_green">
                My Blogs
              </Link>
              <Link
                href="/user/profile"
                className="hover:text-shop_light_green"
              >
                My Profile
              </Link>
              {/* Add this link in your navigation menu */}
              <Link
                href="/orders"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                My Orders
              </Link>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <Link href="/admin" className="hover:text-shop_light_green">
                Admin
              </Link>
              <Link href="/admin/blogs" className="hover:text-shop_light_green">
                Manage Blogs
              </Link>
            </>
          )}
          {user?.role === "seller" && (
            <Link href="/seller" className="hover:text-shop_light_green">
              Seller
            </Link>
          )}
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavouriteButton />
          {!user && (
            <div>
              <Link href="/login">
                <button>SignIn</button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
