"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">
            Revenue Overview
          </h3>
          <p className="mt-0.5 text-xs text-gray-400">
            Last 30 days performance ({data.length} data point
            {data.length !== 1 ? "s" : ""})
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
            Revenue
          </span>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500">
            Last 30 Days
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F3F4F6"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={55}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              padding: "8px 14px",
            }}
            labelStyle={{ color: "#374151", fontWeight: 600, fontSize: 12 }}
            itemStyle={{ color: "#3B82F6", fontSize: 12 }}
            formatter={(v: number | undefined) => [
              `Rs ${(v ?? 0).toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#revenueGrad)"
            dot={false}
            activeDot={{
              fill: "#3B82F6",
              stroke: "#fff",
              strokeWidth: 2,
              r: 5,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {data.length === 1 && (
        <p className="mt-2 text-center text-xs text-gray-400">
          Only one data point available. Add more orders to see the full trend.
        </p>
      )}
    </div>
  );
}
