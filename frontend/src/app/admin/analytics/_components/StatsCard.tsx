"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: "blue" | "green" | "violet" | "amber";
}

const accentMap = {
  blue: { iconBg: "bg-blue-50", iconText: "text-blue-500", bar: "bg-blue-500" },
  green: {
    iconBg: "bg-green-50",
    iconText: "text-green-500",
    bar: "bg-green-500",
  },
  violet: {
    iconBg: "bg-violet-50",
    iconText: "text-violet-500",
    bar: "bg-violet-500",
  },
  amber: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-500",
    bar: "bg-amber-500",
  },
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = "blue",
}: StatsCardProps) {
  const a = accentMap[accentColor];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {title}
          </p>
          {trend && (
            <span
              className={`inline-flex w-fit items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${
                trend.isPositive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {trend.isPositive ? "▲" : "▼"} {Math.abs(trend.value)}%
            </span>
          )}
        </div>

        {icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${a.iconBg} ${a.iconText}`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className="mt-3 text-2xl font-bold tracking-tight text-gray-800">
        {value}
      </p>

      {/* Subtitle */}
      {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}

      {/* Accent bar */}
      <div className="mt-4 h-0.5 w-full rounded-full bg-gray-100">
        <div
          className={`h-0.5 w-2/3 rounded-full transition-opacity duration-300 ${a.bar} opacity-30 group-hover:opacity-60`}
        />
      </div>
    </div>
  );
}
