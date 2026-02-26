"use client";

import { Tag } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div className="bg-transparent border-none rounded-[14px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#f0f0f0] flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-t-[14px]">
        <Tag size={13} className="text-black" />
        <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#1a1a1a]">
          Categories
        </span>
      </div>

      {/* List */}
      <ul className="list-none p-2 m-0 flex flex-col gap-0.5">
        <li>
          <button
            onClick={() => onSelectCategory("")}
            className={`w-full text-left px-3 py-2.5 rounded-lg border-none cursor-pointer text-sm font-normal transition-all duration-150 flex items-center justify-between
              ${
                selectedCategory === ""
                  ? "bg-black text-white font-medium"
                  : "bg-transparent text-[#555] hover:bg-gray-100 hover:text-black"
              }`}
          >
            All Products
            <span
              className={`w-[18px] h-[18px] rounded-full border-[1.5px] border-current flex items-center justify-center flex-shrink-0 text-[10px]
                ${selectedCategory === "" ? "opacity-100 bg-white/20 border-transparent" : "opacity-40"}`}
            >
              ✓
            </span>
          </button>
        </li>

        {categories.map((category) => (
          <li key={category._id}>
            <button
              onClick={() => onSelectCategory(category._id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg border-none cursor-pointer text-sm font-normal transition-all duration-150 flex items-center justify-between
                ${
                  selectedCategory === category._id
                    ? "bg-black text-white font-medium"
                    : "bg-transparent text-[#555] hover:bg-gray-100 hover:text-black"
                }`}
            >
              {category.name}
              <span
                className={`w-[18px] h-[18px] rounded-full border-[1.5px] border-current flex items-center justify-center flex-shrink-0 text-[10px]
                  ${selectedCategory === category._id ? "opacity-100 bg-white/20 border-transparent" : "opacity-40"}`}
              >
                ✓
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
