"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface FilterPanelProps {
  minPrice: string;
  maxPrice: string;
  sort: string;
  onApplyFilters: (filters: Record<string, string>) => void;
}

export default function FilterPanel({
  minPrice,
  maxPrice,
  sort,
  onApplyFilters,
}: FilterPanelProps) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localSort, setLocalSort] = useState(sort);

  const handleApply = () => {
    onApplyFilters({
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
      sort: localSort,
    });
  };

  const handleClear = () => {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    setLocalSort("");
    onApplyFilters({ minPrice: "", maxPrice: "", sort: "" });
  };

  const hasActive = localMinPrice || localMaxPrice || localSort;

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[14px] px-5 py-4 mb-6 flex items-end gap-4 flex-wrap">
      {/* Label */}
      <div className="flex items-center gap-1.5 pb-1">
        <SlidersHorizontal size={14} color="#e85d26" />
        <span className="text-[0.72rem] font-semibold text-[#1a1a1a] tracking-[0.1em] uppercase">
          Filters{" "}
          {hasActive && (
            <span className="inline-block w-1.5 h-1.5 bg-[#e85d26] rounded-full ml-1 align-middle" />
          )}
        </span>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-1">
        <label className="text-[0.7rem] font-medium text-[#888] tracking-[0.05em] uppercase">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(e.target.value)}
            placeholder="Min"
            className="h-10 w-24 px-3 bg-[#f8f7f4] border-[1.5px] border-[#e8e8e8] rounded-[9px] text-sm text-[#1a1a1a] outline-none transition-all duration-150 [appearance:textfield] [&::-webkit-inner-spin-button]:opacity-0 focus:border-[#e85d26] focus:shadow-[0_0_0_3px_rgba(232,93,38,0.08)] focus:bg-white"
          />
          <span className="text-[#ccc] text-sm pb-0.5">–</span>
          <input
            type="number"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(e.target.value)}
            placeholder="Max"
            className="h-10 w-24 px-3 bg-[#f8f7f4] border-[1.5px] border-[#e8e8e8] rounded-[9px] text-sm text-[#1a1a1a] outline-none transition-all duration-150 [appearance:textfield] [&::-webkit-inner-spin-button]:opacity-0 focus:border-[#e85d26] focus:shadow-[0_0_0_3px_rgba(232,93,38,0.08)] focus:bg-white"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-[#ebebeb]" />

      {/* Sort */}
      <div className="flex flex-col gap-1">
        <label className="text-[0.7rem] font-medium text-[#888] tracking-[0.05em] uppercase">
          Sort By
        </label>
        <div className="relative">
          <select
            value={localSort}
            onChange={(e) => setLocalSort(e.target.value)}
            className="h-10 pl-3 pr-9 bg-[#f8f7f4] border-[1.5px] border-[#e8e8e8] rounded-[9px] text-sm text-[#1a1a1a] outline-none appearance-none cursor-pointer min-w-[175px] transition-all duration-150 focus:border-[#e85d26] focus:shadow-[0_0_0_3px_rgba(232,93,38,0.08)] focus:bg-white"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#aaa]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {hasActive && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 h-10 px-4 rounded-[9px] border border-[#e8e8e8] bg-[#f4f4f4] text-[#666] text-sm font-medium cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-[#ebebeb] hover:text-[#333]"
          >
            <X size={13} /> Clear
          </button>
        )}
        <button
          onClick={handleApply}
          className="flex items-center gap-1 h-10 px-4 rounded-[9px] border-none bg-[#e85d26] text-white text-sm font-medium cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-[#d44e1a]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
