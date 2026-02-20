"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishListContext";

interface AddToWishlistButtonProps {
  productId: string;
}

const AddToWishlistButton = ({ productId }: AddToWishlistButtonProps) => {
  let wishlistContext;
  try {
    wishlistContext = useWishlist();
  } catch (error) {
    return (
      <button
        disabled
        className="w-9 h-9 rounded-full border-none bg-[#f4f4f4] flex items-center justify-center"
      >
        <Heart size={17} color="#bbb" fill="none" />
      </button>
    );
  }

  const { addToWishlist, removeItem, isInWishlist } = wishlistContext;
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setInWishlist(isInWishlist(productId));
  }, [productId, isInWishlist]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);

    if (inWishlist) {
      const success = await removeItem(productId);
      if (success) setInWishlist(false);
    } else {
      const success = await addToWishlist(productId);
      if (success) setInWishlist(true);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`w-9 h-9 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-[180ms]
        ${inWishlist ? "bg-[#ffe4e4]" : "bg-[#f4f4f4]"}
        hover:bg-[#ffe4e4] hover:scale-110
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        active:scale-90`}
    >
      <Heart
        size={17}
        color={inWishlist ? "#e85d26" : "#bbb"}
        fill={inWishlist ? "#e85d26" : "none"}
        className="transition-transform duration-200"
      />
    </button>
  );
};

export default AddToWishlistButton;
