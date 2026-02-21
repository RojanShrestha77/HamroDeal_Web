interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {subtitle && <p>{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <span>
                {trend.isPositive ? "↑" : "↓"}
                {Math.abs(trend.value)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                vs last month
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
