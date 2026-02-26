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
import { ProgressSteps } from "../components/common/ProgressSteps";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("🔍 CHECKOUT PAGE LOADED");
  console.log("🛒 Cart:", cart);

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

  const watchedFields = watch();

  const isShippingComplete =
    !!watchedFields.fullName &&
    !!watchedFields.phone &&
    !!watchedFields.address &&
    !!watchedFields.city &&
    !!watchedFields.zipCode &&
    !!watchedFields.country;

  const isPaymentComplete = !!watchedFields.paymentMethod;

  console.log("📝 Watched Fields:", watchedFields);
  console.log("✅ Shipping Complete:", isShippingComplete);
  console.log("✅ Payment Complete:", isPaymentComplete);

  const steps = [
    { number: 1, title: "Shipping", completed: isShippingComplete },
    { number: 2, title: "Payment", completed: isPaymentComplete },
    { number: 3, title: "Review", completed: false },
  ];

  const cartItems = cart?.items || [];
  const hasItems = cartItems.length > 0;

  console.log("🛍️ Cart Items:", cartItems);
  console.log("📊 Has Items:", hasItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = 50;
  const tax = subtotal * 0.13;
  const total = subtotal + shippingCost + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    console.log("🚀 FORM SUBMITTED!");
    console.log("📋 Form Data:", data);
    console.log("🛒 Cart Items at submit:", cartItems);

    if (!hasItems) {
      console.log("❌ Cart is empty - stopping submission");
      toast.error("Your cart is empty");
      return;
    }

    console.log("✅ Cart has items - proceeding...");
    setIsSubmitting(true);
    try {
      const orderData = {
        items: cartItems.map((item) => {
          const productId =
            typeof item.productId === "string"
              ? item.productId
              : (item.productId as any)._id;
          const productDetails =
            typeof item.productId === "object" ? (item.productId as any) : null;
          let sellerId = item.sellerId || "";
          if (productDetails && productDetails.sellerId) {
            sellerId =
              typeof productDetails.sellerId === "string"
                ? productDetails.sellerId
                : productDetails.sellerId._id;
          }
          return {
            productId: productId,
            productName:
              item.name || item.title || productDetails?.title || "Product",
            productImage: item.image || productDetails?.images || "",
            quantity: item.quantity,
            price: item.price,
            sellerId: sellerId,
          };
        }),
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

      console.log("📦 Order Data to send:", orderData);
      console.log(
        "📦 Order Items detail:",
        JSON.stringify(orderData.items, null, 2),
      );
      console.log("🌐 Calling handleCreateOrder...");

      const response = await handleCreateOrder(orderData);
      console.log("📨 Response received:", response);

      if (response.success) {
        console.log("✅ Order created successfully!");
        toast.success(response.message || "Order placed successfully!");
        await clearCart();
        console.log("🧹 Cart cleared");
        console.log("🔀 Redirecting to:", `/orders/${response.data._id}`);
        router.push(`/orders/${response.data._id}`);
      } else {
        console.log("❌ Order creation failed:", response.message);
        toast.error(response.message || "Failed to create order");
      }
    } catch (error: any) {
      console.error("💥 ERROR in order creation:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        error: error,
      });
      toast.error(error.message || "Failed to create order");
    } finally {
      console.log("🏁 Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  if (!cart || !hasItems) {
    console.log("⚠️ Empty cart - showing empty state");
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Add some items to your cart to proceed with checkout
          </p>
          <Link href="/">
            <Button className="bg-black hover:bg-gray-800 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  console.log("✅ Rendering checkout form");
  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressSteps steps={steps} />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              className="w-full h-12 text-lg bg-black hover:bg-gray-800 text-white"
              size="lg"
              onClick={() => console.log("🖱️ Button clicked!")}
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
              <Link href="/terms" className="text-black hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-black hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Order Summary */}
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
