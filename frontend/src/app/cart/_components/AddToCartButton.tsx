"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
}

const AddToCartButton = ({ productId, stock }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const success = await addToCart(productId, 1);
    setLoading(false);

    if (success) {
      alert("Added to cart!");
    } else {
      alert("Failed to add to cart");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={stock === 0 || loading}
      className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {loading ? "Adding..." : stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
};

export default AddToCartButton;
