"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ShoppingCart, Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage?: string;
  sellerId: string;
  stock: number;
}

export function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  sellerId,
  stock,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  console.log("🛒 AddToCartButton rendered");
  console.log("Product ID:", productId);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Stock:", stock);

  const handleAddToCart = async () => {
    console.log("🖱️ Add to Cart clicked!");
    console.log("Quantity:", quantity);
    console.log("Is Authenticated:", isAuthenticated);
    
    if (!isAuthenticated) {
      console.log("❌ User not authenticated - redirecting to login");
      toast.info("Please login to add items to cart");
      router.push("/login");
      return;
    }

    if (stock === 0) {
      console.log("❌ Product out of stock");
      toast.error("Product is out of stock");
      return;
    }

    if (quantity > stock) {
      console.log("❌ Quantity exceeds stock");
      toast.error(`Only ${stock} items available`);
      return;
    }

    console.log("✅ Validation passed - adding to cart");
    setIsAdding(true);
    try {
      console.log("🌐 Calling addToCart with:", { productId, quantity });
      const success = await addToCart(productId, quantity);
      
      console.log("📨 addToCart result:", success);
      
      if (success) {
        console.log("✅ Item added successfully!");
        toast.success(`${productName} added to cart!`);
      } else {
        console.log("❌ Failed to add item");
        toast.error("Failed to add item to cart");
      }
    } catch (error: any) {
      console.error("💥 Error adding to cart:", error);
      toast.error(error.message || "Failed to add item to cart");
    } finally {
      console.log("🏁 Setting isAdding to false");
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      toast.warning(`Only ${stock} items available`);
      return;
    }
    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-3">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || stock === 0}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= stock || stock === 0}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={stock === 0 || isAdding}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isAdding ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding to Cart...
          </>
        ) : stock === 0 ? (
          "Out of Stock"
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
