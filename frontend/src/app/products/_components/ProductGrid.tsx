"use client";

import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images?: string;
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-[14px] overflow-hidden border border-[#ebebeb]"
          >
            <div className="h-[200px] bg-gradient-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]" />
            <div className="p-4 flex flex-col gap-2.5">
              <div
                className="h-3 rounded-md bg-gradient-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]"
                style={{ width: "70%" }}
              />
              <div
                className="h-3 rounded-md bg-gradient-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]"
                style={{ width: "90%" }}
              />
              <div
                className="h-3 rounded-md bg-gradient-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]"
                style={{ width: "40%" }}
              />
            </div>
          </div>
        ))}
        <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 bg-white border border-[#ebebeb] rounded-[14px] gap-3">
        <div className="w-16 h-16 rounded-full bg-[#fef4f0] flex items-center justify-center text-[1.75rem] mb-2">
          🔍
        </div>
        <p className="font-serif text-[1.4rem] font-semibold text-[#1a1a1a]">
          No products found
        </p>
        <p className="text-sm text-[#888]">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[0.8rem] text-[#888] mb-4">
        <strong className="text-[#1a1a1a] font-semibold">
          {products.length}
        </strong>{" "}
        {products.length === 1 ? "product" : "products"} found
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
