import { useWishlist } from "@/context/WishListContext";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavouriteButton = () => {
  const { getItemCount } = useWishlist();
  const itemCount = getItemCount();
  return (
    // relative =Anchor for absolute children
    // group = let children respond to hover/focus of the link
    <Link href="/wishlist" className="group relative">
      <div>
        <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
          {itemCount}
        </span>
      </div>
    </Link>
  );
};

export default FavouriteButton;
