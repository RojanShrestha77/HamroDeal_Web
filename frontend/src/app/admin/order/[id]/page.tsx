"use client";

import {
  handleDeleteAdminOrder,
  handleGetAdminOrderById,
  handleUpdateAdminOrderStatus,
} from "@/lib/actions/(admin)/order-action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Get order ID
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
        const result = await handleGetAdminOrderById(orderId);

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

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!orderId || selectedStatus === order.status) return;

    try {
      setUpdating(true);
      const result = await handleUpdateAdminOrderStatus(
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

  // Handle delete order
  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete order ${order.orderNumber}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const result = await handleDeleteAdminOrder(orderId);
      if (result.success) {
        alert("Order deleted successfully!");
        router.push("/admin/orders");
      } else {
        alert(result.message);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Back button */}
      <Link
        href="/admin/orders"
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
            href="/admin/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Back to Orders
          </Link>
        </div>
      )}

      {/* Order details */}
      {!loading && !error && order && (
        <div className="space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                <p className="text-gray-600 mt-1">
                  Customer: {order.shippingAddress.fullName}
                </p>
              </div>

              {/* Status update */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating || selectedStatus === order.status}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order items */}
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
                  {/* Product image */}
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

                  {/* Product info */}
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

                  {/* Item total */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping address */}
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

          {/* Order summary */}
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

          {/* Admin actions */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Admin Actions
            </h3>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Delete Order
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Warning: This action cannot be undone.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
