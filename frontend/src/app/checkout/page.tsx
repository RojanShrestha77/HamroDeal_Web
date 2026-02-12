// app/checkout/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckoutFormData, CheckoutSchema } from "./schema/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { handleCreateOrder } from "@/lib/actions/order-action";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ShippingSection } from "./_component/ShippingSection";
import { PaymentSection } from "./_component/PaymentSection";
import { NotesSection } from "./_component/NotesSection";
import { OrderSummary } from "./orderSummary";
import { Button } from "../components/ui/button";
import { ProgressSteps } from "../components/ProgressSteps";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      paymentMethod: "cash_on_delivery",
      country: "Nepal",
    },
  });

  // Watch all form fields to determine completion status
  const watchedFields = watch();

  const isShippingComplete =
    !!watchedFields.fullName &&
    !!watchedFields.phone &&
    !!watchedFields.address &&
    !!watchedFields.city &&
    !!watchedFields.zipCode &&
    !!watchedFields.country;

  // Check if payment method is selected
  const isPaymentComplete = !!watchedFields.paymentMethod;

  const steps = [
    { number: 1, title: "Shipping", completed: isShippingComplete },
    { number: 2, title: "Payment", completed: isPaymentComplete },
    { number: 3, title: "Review", completed: false },
  ];

  const cartItems = cart?.items || [];
  const hasItems = cartItems.length > 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = 50;
  const tax = subtotal * 0.13;
  const total = subtotal + shippingCost + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    if (!hasItems) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.name || "Product",
          productImage: item.image || "",
          quantity: item.quantity,
          price: item.price,
          sellerId: item.sellerId || "",
        })),
        shippingAddress: {
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod,
        shippingCost,
        notes: data.notes,
      };

      const response = await handleCreateOrder(orderData);

      if (response.success) {
        toast.success(response.message || "Order placed successfully!");
        await clearCart();
        router.push(`/orders/${response.data._id}`);
      } else {
        toast.error(response.message || "Failed to create order");
      }
    } catch (error: any) {
      console.error("Order creation error:", error);
      toast.error(error.message || "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart state
  if (!cart || !hasItems) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart to proceed with checkout
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <ProgressSteps steps={steps} />

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Form (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 1. Shipping Information */}
            <ShippingSection
              register={register}
              errors={errors}
              isCompleted={isShippingComplete}
            />

            {/* 2. Payment Method */}
            <PaymentSection
              register={register}
              errors={errors}
              isCompleted={isPaymentComplete}
              selectedMethod={watchedFields.paymentMethod || ""}
            />

            {/* 3. Order Notes */}
            <NotesSection register={register} />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isSubmitting || !isShippingComplete || !isPaymentComplete
              }
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>

            {/* Terms and Conditions */}
            <p className="text-xs text-center text-gray-500">
              By placing an order, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Order Summary (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <OrderSummary
            cart={cartItems}
            subtotal={subtotal}
            shippingCost={shippingCost}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
