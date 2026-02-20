"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductGrid from "./_components/ProductGrid";
import FilterPanel from "./_components/filterPanel";
import CategorySidebar from "./_components/CategorySideabar";
import SearchBar from "./_components/SearchBar";

export default function ProductBrowsePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("categoryId") || "";
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    fetchProducts();
  }, [category, search, minPrice, maxPrice, sort]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append("categoryId", category);
      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);

      const response = await fetch(
        `http://localhost:5050/api/products?${params.toString()}`,
      );
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/categories");
      const data = await response.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#ebebeb] px-8 sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto h-[68px] flex items-center justify-between gap-8">
          <div className="text-2xl font-bold text-[#1a1a1a] tracking-tight whitespace-nowrap font-serif">
            HamroDeal<span className="text-[#e85d26]">.</span>
          </div>
          <div className="flex-1 max-w-[480px]">
            <SearchBar
              initialValue={search}
              onSearch={(query: string) => updateFilters({ search: query })}
            />
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] px-8 py-10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-white leading-tight">
              Browse Our Collection
            </h1>
            <p className="text-sm text-white/50 mt-1 font-light">
              Discover thousands of products curated just for you
            </p>
          </div>
          <span className="bg-[#e85d26] text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
            New Arrivals
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-8 py-8 grid grid-cols-[240px_1fr] gap-8 items-start max-[900px]:grid-cols-1 max-[900px]:px-4">
        <aside className="sticky top-[84px] max-[900px]:static">
          <CategorySidebar
            categories={categories}
            selectedCategory={category}
            onSelectCategory={(cat: string) =>
              updateFilters({ categoryId: cat })
            }
          />
        </aside>
        <main className="min-w-0">
          <FilterPanel
            minPrice={minPrice}
            maxPrice={maxPrice}
            sort={sort}
            onApplyFilters={updateFilters}
          />
          <ProductGrid products={products} loading={loading} />
        </main>
      </div>
    </div>
  );
}
