"use client";

import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import AddToCartButton from "@/app/cart/_components/AddToCartButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images?: string | string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;

  // Convert images to array
  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group bg-white border border-gray-100 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200">
      <Link
        href={`products/${product._id}`}
        className="flex flex-col flex-1 no-underline text-inherit"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] min-h-[300px] bg-[#F5F5F7] overflow-hidden">
          {images.length > 0 ? (
            <>
              <img
                src={`http://localhost:5050${images[currentImageIndex]}`}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
              />

              {/* Navigation Arrows - Show only if multiple images */}
              {images.length > 1 && (
                <>
                  {/* Left Arrow - Always show, cycles to last image */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-black text-black hover:text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Right Arrow - Always show, cycles to first image */}
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-black text-black hover:text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          currentImageIndex === index
                            ? "bg-black w-4"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
              <span className="text-4xl">🛍️</span>
              <span className="text-xs font-medium">No image</span>
            </div>
          )}

          {/* Out of stock — top left */}
          {!inStock && (
            <span className="absolute top-3 left-3 bg-[#1D1D1F] text-white text-[0.6rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
              Out of Stock
            </span>
          )}

          {/* Stock badge — bottom right */}
          {inStock && (
            <div className="absolute bottom-3 right-3 z-10">
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
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
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
