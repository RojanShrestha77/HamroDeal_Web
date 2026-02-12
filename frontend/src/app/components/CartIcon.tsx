"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link href={"/cart"} className="group relative">
      <div>
        <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center ">
          {itemCount}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
