"use client";

import { handleGetOrderById } from "@/lib/actions/order-action";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // State variables
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get order ID from params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  // Fetch order data
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Back Button */}
      <Link
        href="/orders"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Orders
      </Link>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Loading order details...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20">
          <div className="text-red-500 mb-4">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Order not found
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            href="/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Back to Orders
          </Link>
        </div>
      )}

      {/* Order Details */}
      {!loading && !error && order && (
        <div className="space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left Side - Order Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Order #{order.orderNumber}
                </h2>
                <p className="text-gray-600">
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

              {/* Right Side - Status Badge */}
              <div>
                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold
                    ${order.status === "pending" ? " bg-yellow-100 text-yellow-800" : ""}
                    ${order.status === "processing" ? " bg-blue-100 text-blue-800" : ""}
                    ${order.status === "shipped" ? " bg-purple-100 text-purple-800" : ""}
                    ${order.status === "delivered" ? " bg-green-100 text-green-800" : ""}
                    ${order.status === "cancelled" ? " bg-red-100 text-red-800" : ""}
                  `}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Items
            </h3>

            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.productImage ? (
                      <img
                        src={`http://localhost:5050${item.productImage}`}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: Rs {item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Shipping Address
            </h3>

            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-2 border-t">
                <span className="text-gray-600">Phone:</span>{" "}
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rs {order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping Cost</span>
                <span>Rs {order.shippingCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Tax (13%)</span>
                <span>Rs {order.tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>Rs {order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-600">Payment Method</p>
              <p className="font-semibold text-gray-900 capitalize">
                {order.paymentMethod.replace(/_/g, " ")}
              </p>
            </div>

            {/* Notes (if any) */}
            {order.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-gray-600">Order Notes</p>
                <p className="text-gray-900">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Cancel Order Button */}
          {order.status === "pending" && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
              <p className="text-gray-600 mb-4">
                You can cancel this order since it hasn't been processed yet.
              </p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                Cancel Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
