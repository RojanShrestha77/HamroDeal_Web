"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function HeaderSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex items-center w-full rounded-xl border border-gray-200 bg-[#F5F5F7] px-3.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#0071E3] focus-within:shadow-[0_0_0_3px_rgba(0,113,227,0.12)]">
        <Search
          size={18}
          className="flex-shrink-0 text-[#1D1D1F] transition-colors duration-200 ml-3 "
          strokeWidth={2}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products, essentials..."
          className="flex-1 h-10 border-none bg-transparent text-sm text-[#1D1D1F] outline-none px-2.5 placeholder:text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-150"
          >
            <X size={11} className="text-gray-600" />
          </button>
        )}
      </div>
    </form>
  );
}
