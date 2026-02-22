"use client";

interface TopProductsTableProps {
  products: Array<{
    _id: string;
    productName: string;
    productImage?: string;
    totalSold: number;
    totalRevenue: number;
  }>;
}

export default function TopProductsTable({ products }: TopProductsTableProps) {
  const maxRevenue = Math.max(...products.map((p) => p.totalRevenue), 1);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700">Top Products</h3>
        <p className="mt-0.5 text-xs text-gray-400">By revenue this period</p>
      </div>

      {/* List */}
      <div className="flex flex-col gap-1">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
          >
            {/* Rank badge */}
            <span
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                index === 0
                  ? "bg-amber-100 text-amber-600"
                  : index === 1
                    ? "bg-gray-100 text-gray-500"
                    : index === 2
                      ? "bg-orange-100 text-orange-500"
                      : "bg-gray-50 text-gray-400"
              }`}
            >
              {index + 1}
            </span>

            {/* Name + bar */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-700">
                {product.productName}
              </p>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-400 transition-all duration-500"
                  style={{
                    width: `${(product.totalRevenue / maxRevenue) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-gray-700">
                Rs {product.totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">{product.totalSold} sold</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
