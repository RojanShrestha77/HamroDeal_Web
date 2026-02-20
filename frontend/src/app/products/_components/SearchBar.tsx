"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  initialValue: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative flex items-center">
      <Search
        size={16}
        className="absolute left-3 text-[#aaa] pointer-events-none flex-shrink-0"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full h-[42px] pl-10 pr-10 bg-[#f4f4f4] border-[1.5px] border-transparent rounded-[10px] text-sm text-[#1a1a1a] outline-none transition-all duration-200 placeholder:text-[#aaa] focus:bg-white focus:border-[#e85d26] focus:shadow-[0_0_0_3px_rgba(232,93,38,0.1)]"
      />
      {query && (
        <button
          className="absolute right-2.5 bg-none border-none cursor-pointer text-[#aaa] flex items-center p-0.5 rounded hover:text-[#1a1a1a] transition-colors duration-150"
          onClick={() => setQuery("")}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
