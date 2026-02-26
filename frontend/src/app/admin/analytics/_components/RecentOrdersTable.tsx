"use client";

interface RecentOrdersTableProps {
  orders: Array<{
    _id: string;
    orderNumber: string;
    userId: {
      firstName: string;
      lastName: string;
      email: string;
    };
    total: number;
    status: string;
    createdAt: string;
  }>;
}

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function getAvatarColor(name: string) {
  if (!name || name.length === 0) {
    return AVATAR_COLORS[0];
  }
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getStatusStyle(status: string) {
  switch (status) {
    case "delivered":
      return "bg-emerald-50 text-emerald-600";
    case "shipped":
      return "bg-blue-50 text-blue-600";
    case "processing":
      return "bg-amber-50 text-amber-600";
    case "pending":
      return "bg-gray-100 text-gray-500";
    case "cancelled":
      return "bg-red-50 text-red-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Recent Orders</h3>
          <p className="mt-0.5 text-xs text-gray-400">Latest transactions</p>
        </div>
        <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50">
          View All
        </button>
      </div>

      {/* Table — scrollable on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Order
              </th>
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Customer
              </th>
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Status
              </th>
              <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total
              </th>
              <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="transition-colors hover:bg-gray-50/60"
              >
                {/* Order number */}
                <td className="py-3 pr-4">
                  <span className="text-xs font-semibold text-blue-500">
                    #{order.orderNumber}
                  </span>
                </td>

                {/* Customer */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(order.userId?.firstName || '')}`}
                    >
                      {order.userId?.firstName?.[0] || ''}
                      {order.userId?.lastName?.[0] || ''}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-700">
                        {order.userId?.firstName || 'N/A'} {order.userId?.lastName || ''}
                      </p>
                      <p className="truncate text-xs text-gray-400">
                        {order.userId?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Total */}
                <td className="py-3 pr-4 text-right text-sm font-semibold text-gray-700">
                  Rs {order.total.toLocaleString()}
                </td>

                {/* Date */}
                <td className="py-3 text-right text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
