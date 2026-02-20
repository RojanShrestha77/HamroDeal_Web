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

export default function Productcard({ product }: ProductCardProps) {
  return (
    <div>
      <Link href={`products/${product._id}`} className="flex flex-col flex-1">
        {/* product image */}
        <div>
          {product.images ? (
            <img
              src={`http://localhost:5050${product.images}`}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>

        {/* product info */}
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <p className="text-xl font-bold text-gray-900 mb-2">
          rs{product.price}
        </p>

        {/* stock status */}
        <p>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
        </p>
      </Link>

      <div className="mb-2">
        <AddToWishlistButton productId={product._id} />
      </div>

      <AddToCartButton productId={product._id} stock={product.stock} />
    </div>
  );
}
