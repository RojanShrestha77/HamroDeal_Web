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
      <div className="flex items-center bg-[#f4f4f4] border-[1.5px] border-transparent rounded-[10px] px-3 transition-all duration-150 focus-within:bg-white focus-within:border-[#e85d26] focus-within:shadow-[0_0_0_3px_rgba(232,93,38,0.08)]">
        <Search
          size={15}
          className="text-[#bbb] flex-shrink-0 transition-colors duration-150 group-focus-within:text-[#e85d26]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 h-10 border-none bg-transparent text-sm text-[#1a1a1a] outline-none px-2 placeholder:text-[#bbb]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="flex-shrink-0 flex items-center p-0.5 rounded bg-transparent border-none cursor-pointer text-[#bbb] hover:text-[#555] transition-colors duration-150"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </form>
  );
}
