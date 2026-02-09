"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Home,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FavouritePage = () => {
  const { wishlist, loading, removeItem, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // redirect to the login if not logged in
  React.useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading your wishlist...
          </p>
        </div>
      </div>
    );
  }

  if (!wishlist || wishlist.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
            <Heart className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Save items you love by clicking the heart icon. They'll appear here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              Continue Shopping
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRemoveItem = async (productId: string) => {
    if (confirm("Remove this item from wishlist?")) {
      await removeItem(productId);
    }
  };

  const handleClearWishlist = async () => {
    if (confirm("Clear the entire wishlist?")) {
      await clearWishlist();
    }
  };

  const handleAddToCart = async (productId: string) => {
    const success = await addToCart(productId, 1);
    if (success) {
      alert("Added to cart");
    } else {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 mt-2">
                {wishlist.items.length}{" "}
                {wishlist.items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            {wishlist.items.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200 self-start sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.items.map((item) => {
            const product =
              typeof item.productId == "object" ? item.productId : null;
            const productId =
              typeof item.productId == "string"
                ? item.productId
                : item.productId._id;

            const isOutOfStock = !product?.stock || product.stock === 0;

            return (
              <div
                key={productId}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50">
                  <Link
                    href={`/products/${productId}`}
                    className="block h-full"
                  >
                    {product?.images ? (
                      <img
                        src={`http://localhost:5050${product.images}`}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(productId)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white hover:shadow transition-all duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <Link href={`/products/${productId}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {product?.title || "Product"}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">
                    {product?.description || "No description available"}
                  </p>

                  <div className="space-y-3 mt-auto">
                    {/* Price and Stock */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        Rs {product?.price?.toLocaleString() || 0}
                      </span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          isOutOfStock
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {isOutOfStock ? "Out of stock" : "In stock"}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(productId)}
                      disabled={isOutOfStock}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        isOutOfStock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Items remain in your wishlist until you remove them or add them to
            your cart
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavouritePage;
