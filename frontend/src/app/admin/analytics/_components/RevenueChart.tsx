import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: Array<{
    data: string;
    revenue: string;
    orders: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div>
      <h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3 " stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
            <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#F3F4F6" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </h3>
    </div>
  );
}
