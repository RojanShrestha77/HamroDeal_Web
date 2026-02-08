import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
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
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col cursor-pointer"
            >
              {/* Product Image */}
              <div className="w-full mb-4 rounded overflow-hidden bg-gray-100">
                {product.images ? (
                  <img
                    src={`http://localhost:5050${product.images}`}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>

              <p className="text-xl font-bold text-gray-900 mb-2">
                Rs {product.price}
              </p>

              {/* Stock Status */}
              <p
                className={`text-sm mb-4 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>

              {/* Add to Cart Button */}
              <button
                disabled={product.stock === 0}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
