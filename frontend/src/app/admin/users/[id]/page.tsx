import { getUserDetailPage } from "@/lib/api/(admin)/user";
import { notFound } from "next/navigation";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data = null;
  let error = null;

  try {
    const response = await getUserDetailPage(id);
    data = response.data;
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  const { user, statistics, recentOrders, recentProducts } = data;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Details</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.isApproved
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.isApproved ? "Approved" : "Pending"}
            </span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                {user.role}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold">Total Orders</h3>
          </div>
          <div className="p-6">
            <p className="text-2xl font-bold">{statistics.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold">Total Spent</h3>
          </div>
          <div className="p-6">
            <p className="text-2xl font-bold">${statistics.totalSpent}</p>
          </div>
        </div>

        {user.role === "seller" && (
          <>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold">Total Products</h3>
              </div>
              <div className="p-6">
                <p className="text-2xl font-bold">{statistics.totalProducts}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold">Total Revenue</h3>
              </div>
              <div className="p-6">
                <p className="text-2xl font-bold">${statistics.totalRevenue}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        <div className="p-6">
          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders yet</p>
          ) : (
            <div className="space-y-2">
              {recentOrders.map((order: any) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <span className="inline-block px-2 py-1 text-xs rounded border border-gray-300 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Products (if seller) */}
      {user.role === "seller" && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Recent Products</h2>
          </div>
          <div className="p-6">
            {recentProducts.length === 0 ? (
              <p className="text-gray-500">No products yet</p>
            ) : (
              <div className="space-y-2">
                {recentProducts.map((product: any) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </p>
                    </div>
                    <p className="font-medium">${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
