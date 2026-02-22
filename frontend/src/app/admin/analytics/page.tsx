import {
  handleGetAnalyticsOverview,
  handleGetRecentOrders,
  handleGetRevenueData,
  handleGetTopProducts,
} from "@/lib/actions/(admin)/analytics.action";
import StatsCard from "./_components/StatsCard";
import RevenueChart from "./_components/RevenueChart";
import TopProductsTable from "./_components/TopProductsTable";
import RecentOrdersTable from "./_components/RecentOrdersTable";

export default async function Page() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const [overViewResult, revenueResult, topProductsResult, recentOrdersResult] =
    await Promise.all([
      handleGetAnalyticsOverview(),
      handleGetRevenueData(
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0],
      ),
      handleGetTopProducts(5),
      handleGetRecentOrders(10),
    ]);

  if (!overViewResult.success) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-8 text-red-500">
        <span className="mr-2 text-lg">⚠️</span> Error loading analytics
      </div>
    );
  }

  const { revenue, orders, users, products } = overViewResult.data;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Admin Panel
            </p>
            <h1 className="mt-0.5 text-xl font-bold text-gray-800">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs text-gray-500 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live · Last 30 days
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value={`Rs ${revenue.allTime.toLocaleString()}`}
            subtitle={`Rs ${revenue.thisMonth.toLocaleString()} this month`}
            icon={<span>💰</span>}
            accentColor="blue"
          />
          <StatsCard
            title="Total Orders"
            value={orders.total}
            subtitle={`${orders.pending} pending`}
            icon={<span>📦</span>}
            accentColor="green"
          />
          <StatsCard
            title="Total Users"
            value={users.total}
            subtitle={`${users.sellers} sellers · ${users.buyers} buyers`}
            icon={<span>👥</span>}
            accentColor="violet"
          />
          <StatsCard
            title="Total Products"
            value={products.total}
            subtitle={`${products.lowStock} low stock`}
            icon={<span>🛍️</span>}
            accentColor="amber"
          />
        </div>

        {/* Revenue chart */}
        {revenueResult.success &&
        revenueResult.data &&
        revenueResult.data.length > 0 ? (
          <RevenueChart data={revenueResult.data} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-400">
              No revenue data available for the last 30 days
            </p>
          </div>
        )}

        {/* Bottom tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {topProductsResult.success && (
            <div className="lg:col-span-2">
              <TopProductsTable products={topProductsResult.data} />
            </div>
          )}
          {recentOrdersResult.success && (
            <div className="lg:col-span-3">
              <RecentOrdersTable orders={recentOrdersResult.data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
