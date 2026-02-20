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
    <div className="bg-white border border-[#ebebeb] rounded-[14px] overflow-hidden flex flex-col transition-all duration-[220ms] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] hover:border-[#e0e0e0]">
      <Link
        href={`products/${product._id}`}
        className="flex flex-col flex-1 no-underline text-inherit"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#f8f7f4] overflow-hidden">
          {product.images ? (
            <img
              src={`http://localhost:5050${product.images}`}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#ccc]">
              <span className="text-[2rem]">🛍️</span>
              <span className="text-xs">No image</span>
            </div>
          )}

          {!inStock && (
            <span className="absolute top-2.5 left-2.5 bg-[#1a1a1a] text-white text-[0.65rem] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
          {lowStock && (
            <span className="absolute top-2.5 left-2.5 bg-[#fff3e8] text-[#e85d26] border border-[#fdd7c0] text-[0.65rem] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-full">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-1.5 flex-1">
          <h2 className="text-[0.9rem] font-semibold text-[#1a1a1a] m-0 leading-[1.3] line-clamp-2">
            {product.title}
          </h2>
          <p className="text-[0.78rem] font-light text-[#999] m-0 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-2.5">
            <span className="font-serif text-xl font-bold text-[#1a1a1a]">
              Rs {product.price.toLocaleString()}
            </span>
            {inStock && (
              <span
                className={`text-[0.7rem] ${lowStock ? "text-[#e85d26] font-medium" : "text-[#bbb]"}`}
              >
                {product.stock} in stock
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2 border-t border-[#f4f4f4]">
        <AddToWishlistButton productId={product._id} />
        <AddToCartButton productId={product._id} stock={product.stock} />
      </div>
    </div>
  );
}
