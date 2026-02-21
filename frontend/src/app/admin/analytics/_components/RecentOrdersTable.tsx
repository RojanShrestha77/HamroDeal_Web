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
export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div>
      <h3>
        <div>
          <table>
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Order #
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{order.orderNumber}</td>
                  <td>
                    <div>
                      <p>
                        {order.userId.firstName} {order.userId.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {order.userId.email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>Rs {order.total.toLocaleString()}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </h3>
    </div>
  );
}
