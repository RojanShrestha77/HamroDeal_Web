"use client";
import { headerData } from "@/app/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  return (
    <div className="sm:hidden md:inline-flex w-1/3 items-center gap-7 text-sm capitalize font-semibold text-lightColor">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`relative group hover:text-shop_light_green hoverEffect ${
            pathname === item?.href && "text-shop_light_green"
          }`}
        >
          {item?.title}

          {/* Underline: starts at center, expands both sides */}
          <span
            className="absolute left-1/2 -bottom-0.5 h-0.5 w-0 bg-shop_light_green 
                        -translate-x-1/2 transition-all duration-300 ease-in-out
                        group-hover:w-full"
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
