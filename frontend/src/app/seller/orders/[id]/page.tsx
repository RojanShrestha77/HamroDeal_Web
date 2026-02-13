"use client";
import {
  handleGetSellerOrderById,
  handleUpdateSellerOrderStatus,
} from "@/lib/actions/seller/order-action";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SellerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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
        const result = await handleGetSellerOrderById(orderId);

        if (result.success) {
          setOrder(result.data);
          setSelectedStatus(result.data.status);
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

  const handleStatusUpdate = async () => {
    if (!orderId || selectedStatus === order.status) return;

    try {
      setUpdating(true);
      const result = await handleUpdateSellerOrderStatus(
        orderId,
        selectedStatus,
      );

      if (result.success) {
        setOrder({ ...order, status: selectedStatus });
        alert("Order status updated successfully!");
      } else {
        alert(result.message);
        setSelectedStatus(order.status);
      }
    } catch (err: any) {
      alert(err.message);
      setSelectedStatus(order.status);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      processing: "bg-blue-100 text-blue-700 border-blue-300",
      shipped: "bg-purple-100 text-purple-700 border-purple-300",
      delivered: "bg-green-100 text-green-700 border-green-300",
      cancelled: "bg-red-100 text-red-700 border-red-300",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-700"}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/seller/orders"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg
            className="w-4 h-4 mr-1.5"
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
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-200 border-t-blue-600"></div>
            <p className="mt-3 text-sm text-gray-600">
              Loading order details...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                className="w-8 h-8 text-red-600"
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Order Not Found
            </h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <Link
              href="/seller/orders"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Back to Orders
            </Link>
          </div>
        )}

        {/* Order Details */}
        {!loading && !error && order && (
          <div className="space-y-4">
            {/* Order Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 mb-1.5">
                    Order #{order.orderNumber}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                    <span className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>{order.shippingAddress.fullName}</span>
                  </div>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Status Update */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Update Order Status
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={
                      order.status === "cancelled" ||
                      order.status === "delivered"
                    }
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={
                      updating ||
                      selectedStatus === order.status ||
                      order.status === "cancelled" ||
                      order.status === "delivered"
                    }
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-900">
                  Order Items
                </h2>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                        {item.productImage ? (
                          <img
                            src={`http://localhost:5050${item.productImage}`}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {item.productName}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          <span className="text-gray-300">•</span>
                          <span>Rs {item.price.toFixed(2)} each</span>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      Rs{" "}
                      {order.items
                        .reduce(
                          (sum: number, item: any) =>
                            sum + item.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Payment - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1.5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Shipping Address
                  </h3>
                </div>
                <div className="p-5">
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-gray-900">
                      {order.shippingAddress.fullName}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.address}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.country}
                    </p>
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1.5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Payment Information
                  </h3>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {order.paymentMethod.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Amount to Collect
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        Rs{" "}
                        {order.items
                          .reduce(
                            (sum: number, item: any) =>
                              sum + item.price * item.quantity,
                            0,
                          )
                          .toFixed(2)}
                      </span>
                    </div>

                    {order.notes && (
                      <div className="pt-3 mt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-1.5">
                          Customer Notes
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-md p-2.5">
                          <p className="text-xs text-gray-800 leading-relaxed">
                            {order.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
