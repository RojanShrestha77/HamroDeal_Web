"use client";

import { useEffect, useState } from "react";
import ProductCard from "../products/_components/ProductCard";
import Link from "next/link";
import BannerCarousel from "./_components/BannerCarousel";
import AllProductsSection from "./_components/AllProductsSection";
import {
  getNewestProductsAction,
  getTrendingProductsAction,
} from "@/lib/actions/product.action";

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newestProducts, setNewestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔄 Fetching products...");
        const [trending, newest] = await Promise.all([
          getTrendingProductsAction(8, 30),
          getNewestProductsAction(8),
        ]);

        console.log("📊 Trending response:", trending);
        console.log("📊 Newest response:", newest);

        if (trending.success) {
          console.log("✅ Setting trending products:", trending.data?.length || 0);
          setTrendingProducts(trending.data || []);
        } else {
          console.log("❌ Trending failed:", trending.message);
        }
        
        if (newest.success) {
          console.log("✅ Setting newest products:", newest.data?.length || 0);
          setNewestProducts(newest.data || []);
        } else {
          console.log("❌ Newest failed:", newest.message);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <BannerCarousel />

      {/* Trending Products Section */}
      <div className="max-w-screen-xl mx-auto px-6 mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111]">Trending Now</h2>
            <p className="text-sm text-[#888] mt-1">
              Popular products this month
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-[#111] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-white transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {trendingProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No trending products available
          </div>
        )}
      </div>

      {/* Newest Products Section */}
      <div className="max-w-screen-xl mx-auto px-6 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111]">New Arrivals</h2>
            <p className="text-sm text-[#888] mt-1">
              Check out our latest products
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-[#111] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-white transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        ) : newestProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {newestProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No new products available
          </div>
        )}
      </div>

      {/* All Products Section */}
      <div className="mt-16">
        <div className="max-w-screen-xl mx-auto px-6 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#111]">All Products</h2>
            <p className="text-sm text-[#888] mt-1">
              Browse our complete collection
            </p>
          </div>
        </div>
        <AllProductsSection />
      </div>
    </div>
  );
};

export default HomePage;
