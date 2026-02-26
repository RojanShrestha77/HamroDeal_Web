import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../cart/_components/AddToCartButton";
import AddToWishlistButton from "./_components/AddToWishlistButton";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images?: string;
  categoryId?: {
    _id: string;
    name: string;
  };
  sellerId?: {
    _id: string;
    username?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
};

async function getAllProduct() {
  try {
    const response = await fetch(`http://localhost:5050/api/products`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function ProductHomePage() {
  const result = await getAllProduct();

  if (!result?.success || !result.data) {
    notFound();
  }

  const products = result.data;

  return (
    <div className="w-full min-h-screen bg-white py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product: Product) => (
            <div
              key={product._id}
              className="group bg-white rounded-[12px] border border-[#e8e8e8] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Product Image with Wishlist overlay */}
              <div
                className="relative w-full bg-[#f0f0f0]"
                style={{ height: "200px", flexShrink: 0 }}
              >
                <Link
                  href={`/products/${product._id}`}
                  className="block w-full h-full"
                >
                  {product.images ? (
                    <img
                      src={`http://localhost:5050${product.images}`}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        display: "block",
                      }}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full flex items-center justify-center"
                      style={{ height: "200px" }}
                    >
                      <span className="text-[#999] text-sm">No Image</span>
                    </div>
                  )}
                </Link>

                {/* Wishlist Button - top right corner over image */}
                <div className="absolute top-3 right-3 z-10">
                  <AddToWishlistButton productId={product._id} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/products/${product._id}`}>
                  {/* Product Name */}
                  <h2 className="text-[15px] font-semibold text-[#111] mb-1 leading-snug">
                    {product.title}
                  </h2>

                  {/* Product Description */}
                  <p className="text-[13px] text-[#666] mb-3 line-clamp-2 leading-[1.5]">
                    {product.description}
                  </p>
                </Link>

                {/* Price Row */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[16px] font-semibold text-[#111]">
                    Rs. {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-[14px] text-[#999] line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  {product.stock === 0 && (
                    <span className="text-[11px] text-red-500 font-medium ml-1">
                      Out of stock
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="mt-auto">
                  <AddToCartButton
                    productId={product._id}
                    stock={product.stock}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
