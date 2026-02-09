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
  const { addToWishlist, removeItem, isInWishlist } = useWishlist();
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
      if (success) {
        setInWishlist(false);
      }
    } else {
      const success = await addToWishlist(productId);
      if (success) {
        setInWishlist(true);
      }
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`p-2 rounded-full transition ${
        inWishlist
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } disabled:opacity-50`}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
    </button>
  );
};

export default AddToWishlistButton;
