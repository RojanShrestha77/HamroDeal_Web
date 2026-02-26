"use client";

import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import AddToCartButton from "@/app/cart/_components/AddToCartButton";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;

  return (
    <div className="group bg-white border border-gray-100 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200">
      <Link
        href={`products/${product._id}`}
        className="flex flex-col flex-1 no-underline text-inherit"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#F5F5F7] overflow-hidden">
          {product.images ? (
            <img
              src={`http://localhost:5050${product.images}`}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
              <span className="text-4xl">🛍️</span>
              <span className="text-xs font-medium">No image</span>
            </div>
          )}

          {/* Out of stock — top left */}
          {!inStock && (
            <span className="absolute top-3 left-3 bg-[#1D1D1F] text-white text-[0.6rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}

          {/* Stock badge — bottom right */}
          {inStock && (
            <div className="absolute bottom-3 right-3">
              {lowStock ? (
                <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md ring-1 ring-red-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                  <span className="text-[0.6rem] font-bold text-red-500 uppercase tracking-wide">
                    Only {product.stock} left
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                  <span className="text-[0.6rem] font-semibold text-white uppercase tracking-wide">
                    {product.stock} in stock
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Wishlist — top right, show on hover */}
          <div
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => e.preventDefault()}
          >
            <div className="rounded-full bg-white shadow-md ring-1 ring-gray-100 p-1.5">
              <AddToWishlistButton productId={product._id} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-1 flex-1">
          <h2 className="text-sm font-semibold text-[#1D1D1F] leading-snug line-clamp-2">
            {product.title}
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-auto pt-3 flex items-end justify-between">
            <span className="text-sm font-semibold text-[#1D1D1F]">
              Rs {product.price.toLocaleString()}
            </span>
            {!inStock && (
              <span className="text-xs font-medium text-gray-400">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-4 pb-4">
        <AddToCartButton productId={product._id} stock={product.stock} />
      </div>
    </div>
  );
}
