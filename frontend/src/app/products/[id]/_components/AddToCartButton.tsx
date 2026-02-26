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
  quantity?: number; // allow parent to pass quantity
  hideQuantity?: boolean; // hide internal quantity selector
  className?: string; // allow style override
}

export function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  sellerId,
  stock,
  quantity: externalQuantity,
  hideQuantity = false,
  className,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [internalQuantity, setInternalQuantity] = useState(1);

  const quantity = externalQuantity ?? internalQuantity;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to cart");
      router.push("/login");
      return;
    }
    if (stock === 0) {
      toast.error("Product is out of stock");
      return;
    }
    if (quantity > stock) {
      toast.error(`Only ${stock} items available`);
      return;
    }

    setIsAdding(true);
    try {
      const success = await addToCart(productId, quantity);
      if (success) {
        toast.success(`${productName} added to cart!`);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      toast.warning(`Only ${stock} items available`);
      return;
    }
    setInternalQuantity(newQuantity);
  };

  return (
    <div className="space-y-3">
      {/* Internal quantity selector — hidden when parent manages quantity */}
      {!hideQuantity && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(internalQuantity - 1)}
              disabled={internalQuantity <= 1 || stock === 0}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="w-12 text-center font-medium">
              {internalQuantity}
            </span>
            <button
              onClick={() => handleQuantityChange(internalQuantity + 1)}
              disabled={internalQuantity >= stock || stock === 0}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={stock === 0 || isAdding}
        className={
          className ??
          "w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        }
      >
        {isAdding ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding...
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
