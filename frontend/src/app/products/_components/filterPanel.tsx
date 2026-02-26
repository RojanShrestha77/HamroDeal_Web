"use client";

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface FilterPanelProps {
  minPrice: string;
  maxPrice: string;
  sort: string;
  onApplyFilters: (filters: Record<string, string>) => void;
}

const MAX_PRICE = 50000;

export default function FilterPanel({
  minPrice,
  maxPrice,
  sort,
  onApplyFilters,
}: FilterPanelProps) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localSort, setLocalSort] = useState(sort);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [draggingThumb, setDraggingThumb] = useState<"min" | "max" | null>(
    null,
  );

  const minVal = Number(localMinPrice) || 0;
  const maxVal = localMaxPrice ? Number(localMaxPrice) : MAX_PRICE;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onApplyFilters({
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
        sort: localSort,
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [localMinPrice, localMaxPrice, localSort]);

  useEffect(() => {
    if (draggingThumb === null && (localMinPrice || localMaxPrice)) {
      onApplyFilters({
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
        sort: localSort,
      });
    }
  }, [draggingThumb]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingThumb || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));
      const val = Math.round(percent * MAX_PRICE);
      if (draggingThumb === "min") {
        setLocalMinPrice(Math.min(val, maxVal - 100).toString());
      } else {
        setLocalMaxPrice(Math.max(val, minVal + 100).toString());
      }
    };
    const handlePointerUp = () => setDraggingThumb(null);
    if (draggingThumb) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingThumb, maxVal, minVal]);

  const handleClear = () => {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    setLocalSort("");
  };

  const hasActive = localMinPrice || localMaxPrice || localSort;
  const formatPrice = (price: number) => `Rs. ${price.toLocaleString("en-IN")}`;

  return (
    <div className="bg-transparent px-0 py-4 mb-6 flex flex-col md:flex-row md:items-center gap-4 w-full">
      {/* ── LEFT — Filters label + Price slider ──────────────────────────── */}
      <div className="flex items-center gap-5 flex-1">
        {/* Label */}
        <div className="flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal size={14} className="text-black" />
          <span className="text-[0.72rem] font-semibold text-[#1D1D1F] tracking-[0.1em] uppercase">
            Filters
            {hasActive && (
              <span className="inline-block w-1.5 h-1.5 bg-black rounded-full ml-1 align-middle" />
            )}
          </span>
        </div>

        <div className="w-px h-8 bg-gray-200 shrink-0 hidden md:block" />

        {/* Price Range Slider */}
        <div className="flex flex-col gap-1.5 w-[220px] shrink-0">
          <div className="flex flex-col gap-0.5">
            <label className="text-[0.68rem] font-medium text-gray-400 tracking-widest uppercase">
              Price Range
            </label>
            <span className="text-[0.72rem] font-semibold text-[#1D1D1F]">
              {formatPrice(minVal)} — {formatPrice(maxVal)}
            </span>
          </div>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="relative w-full h-5 flex items-center cursor-pointer select-none touch-none"
            onPointerDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              let percent = (e.clientX - rect.left) / rect.width;
              percent = Math.max(0, Math.min(1, percent));
              const val = percent * MAX_PRICE;
              if (Math.abs(val - minVal) < Math.abs(val - maxVal)) {
                setLocalMinPrice(Math.round(val).toString());
                setDraggingThumb("min");
              } else {
                setLocalMaxPrice(Math.round(val).toString());
                setDraggingThumb("max");
              }
            }}
          >
            <div className="absolute w-full h-1 bg-gray-200 rounded-full pointer-events-none" />
            <div
              className="absolute h-1 bg-black rounded-full pointer-events-none"
              style={{
                left: `${(minVal / MAX_PRICE) * 100}%`,
                right: `${100 - (maxVal / MAX_PRICE) * 100}%`,
              }}
            />
            <div
              className={`absolute w-3.5 h-3.5 bg-white border-[1.5px] border-black rounded-full cursor-grab active:cursor-grabbing hover:scale-110 transition-transform shadow-sm ${draggingThumb === "min" ? "scale-110 z-10" : "z-0"}`}
              style={{ left: `calc(${(minVal / MAX_PRICE) * 100}% - 7px)` }}
              onPointerDown={(e) => {
                e.stopPropagation();
                setDraggingThumb("min");
              }}
            />
            <div
              className={`absolute w-3.5 h-3.5 bg-white border-[1.5px] border-black rounded-full cursor-grab active:cursor-grabbing hover:scale-110 transition-transform shadow-sm ${draggingThumb === "max" ? "scale-110 z-10" : "z-0"}`}
              style={{ left: `calc(${(maxVal / MAX_PRICE) * 100}% - 7px)` }}
              onPointerDown={(e) => {
                e.stopPropagation();
                setDraggingThumb("max");
              }}
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT — Sort + Clear ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {hasActive && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 h-9 px-4 rounded-full border border-gray-200 text-gray-400 text-xs font-medium transition-all hover:border-black hover:text-black whitespace-nowrap"
          >
            <X size={12} /> Clear
          </button>
        )}

        {/* Sort By oval pill */}
        <div className="relative">
          <select
            value={localSort}
            onChange={(e) => setLocalSort(e.target.value)}
            className="h-9 pl-4 pr-9 bg-white border border-gray-200 rounded-full text-xs font-medium text-[#1D1D1F] outline-none appearance-none cursor-pointer min-w-[160px] transition-all focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] hover:border-gray-400"
          >
            <option value="">Sort: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <ChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
