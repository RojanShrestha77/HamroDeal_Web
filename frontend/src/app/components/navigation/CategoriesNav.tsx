"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getAllCategories } from "@/lib/api/category";

interface Category {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.success) {
        setCategories(
          response.data.filter((cat: Category) => cat.status === "active"),
        );
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  return (
    <nav className="bg-white border-b border-[#F5F5F7]">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center  h-12 overflow-x-auto scrollbar-hide">
          {/* All Products Link */}
          <Link
            href="/products"
            className="text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors whitespace-nowrap px-8"
          >
            All Products
          </Link>

          {/* Category Links */}
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?categoryId=${category._id}`}
              className="text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors whitespace-nowrap px-8"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
