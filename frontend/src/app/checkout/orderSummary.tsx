// app/checkout/orderSummary.tsx
"use client";

import { Package, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/context/CartContext"; // ✅ Import from context
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

export function OrderSummary({
  cart,
  subtotal,
  shippingCost,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items List */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {cart.map((item, index) => {
            // Handle product name and image
            const productName = item.name || item.title || "Product";
            const productImage = item.image || "";

            // ✅ Simple and correct - just use productId or fallback to index
            const productKey = item.productId || `item-${index}`;

            return (
              <div
                key={productKey}
                className="flex gap-3 pb-3 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={productName}
                      fill
                      sizes="64px"
                      className="object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × Rs. {item.price.toFixed(2)}
                  </p>
                </div>

                {/* Item Total */}
                <div className="text-sm font-semibold text-gray-900 flex-shrink-0">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Rs. {shippingCost.toFixed(2)}</span>
          </div>

          {/* Tax */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (13%)</span>
            <span className="font-medium">Rs. {tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            Rs. {total.toFixed(2)}
          </span>
        </div>

        {/* Security Badge */}
        <div className="mt-6 p-3 bg-green-50 rounded-lg flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            Secure Checkout
          </span>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 text-center">
          <p>Your payment information is encrypted and secure.</p>
        </div>
      </CardContent>
    </Card>
  );
}
