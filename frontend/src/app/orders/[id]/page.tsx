"use client";

import {
  handleGetOrderById,
  handleCancelOrder,
} from "@/lib/actions/order-action";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  FileText,
  AlertCircle,
  ArrowLeft,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const getOrderSteps = () => {
    const steps = [
      { key: "pending", label: "Order Placed", icon: Clock, color: "amber" },
      {
        key: "processing",
        label: "Order Packed",
        icon: Package,
        color: "blue",
      },
      {
        key: "shipped",
        label: "Out for Delivery",
        icon: Truck,
        color: "purple",
      },
      {
        key: "delivered",
        label: "Order Delivered",
        icon: CheckCircle,
        color: "green",
      },
    ];

    const statusOrder = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(order?.status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const result = await handleGetOrderById(orderId);

        if (result.success) {
          setOrder(result.data);
        } else {
          setError(result.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "processing":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-50 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const handleCancelOrderClick = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancelling(true);
      const result = await handleCancelOrder(orderId);

      if (result.success) {
        // Refresh order data
        const updatedOrder = await handleGetOrderById(orderId);
        if (updatedOrder.success) {
          setOrder(updatedOrder.data);
        }
        alert("Order cancelled successfully!");
      } else {
        alert(result.message || "Failed to cancel order");
      }
    } catch (err: any) {
      alert(err.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[0.72rem] text-gray-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={11} />
          <Link href="/orders" className="hover:text-black transition-colors">
            Orders
          </Link>
          <ChevronRight size={11} />
          <span className="text-gray-700 font-medium">Order Details</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4" />
            <p className="text-sm text-gray-500">Loading order details...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Order not found
            </h2>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <Link
              href="/orders"
              className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
            >
              Back to Orders
            </Link>
          </div>
        )}

        {/* Order Details */}
        {!loading && !error && order && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Order #{order.orderNumber}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 h-10 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Order Tracking Timeline */}
            {order.status !== "cancelled" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-8">
                  Track Your Order
                </h2>

                <div className="relative">
                  {getOrderSteps().map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === getOrderSteps().length - 1;

                    return (
                      <div
                        key={step.key}
                        className="relative flex gap-4 pb-10 last:pb-0"
                      >
                        {/* Dotted Vertical Line */}
                        {!isLast && (
                          <div
                            className="absolute left-[11px] top-6 w-[2px] h-[calc(100%-24px)]"
                            style={{
                              backgroundImage: step.completed
                                ? "repeating-linear-gradient(0deg, #ec4899, #ec4899 4px, transparent 4px, transparent 8px)"
                                : "repeating-linear-gradient(0deg, #d1d5db, #d1d5db 4px, transparent 4px, transparent 8px)",
                            }}
                          />
                        )}

                        {/* Icon Circle */}
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-pink-500" : "bg-gray-300"
                            }`}
                          >
                            {step.completed && (
                              <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex items-start justify-between pt-0.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                step.completed
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-gray-50 text-gray-300"
                              }`}
                            >
                              <Icon size={20} />
                            </div>
                            <div>
                              <h3
                                className={`font-semibold text-base ${
                                  step.completed
                                    ? "text-gray-900"
                                    : "text-gray-300"
                                }`}
                              >
                                {step.label}
                              </h3>
                            </div>
                          </div>

                          {/* Timestamp */}
                          {step.completed && order.updatedAt && (
                            <p className="text-sm text-gray-500 whitespace-nowrap">
                              {new Date(order.updatedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Package size={18} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
              </div>

              <div className="space-y-4">
                {order.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      {item.productImage ? (
                        <img
                          src={`http://localhost:5050${item.productImage}`}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × Rs {item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">
                        Rs {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Shipping Address
                  </h2>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-gray-900">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.country}
                  </p>
                  <p className="pt-2 text-gray-600">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={18} className="text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs {order.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Rs {order.shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax (13%)</span>
                    <span>Rs {order.tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-2.5 flex justify-between text-base font-bold text-gray-900">
                    <span>Total</span>
                    <span>Rs {order.total.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-900 text-sm capitalize">
                      {order.paymentMethod.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Order Notes
                  </h2>
                </div>
                <p className="text-sm text-gray-600">{order.notes}</p>
              </div>
            )}

            {/* Cancel Order */}
            {order.status === "pending" && (
              <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Cancel Order
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You can cancel this order since it hasn't been processed yet.
                </p>
                <button
                  onClick={handleCancelOrderClick}
                  disabled={cancelling}
                  className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
