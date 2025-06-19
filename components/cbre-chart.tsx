import * as React from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

// Chart Data Types
interface ChartData {
  name: string;
  actual?: number;
  target?: number;
  value?: number;
}

// CBRE Chart Colors using CSS variables
export const chartConfig = {
  colors: [
    "var(--cbre-green)",      // Primary
    "var(--accent-green)",    // Secondary
    "var(--celadon)",         // Tertiary
    "var(--wheat)",           // Quaternary
    "var(--sage)",            // Additional
    "var(--midnight)",        // Additional
  ],
  axis: "var(--dark-grey)",
  grid: "var(--light-grey)",
  tooltip: {
    background: "var(--lighter-grey)",
    text: "var(--dark-grey)",
    border: "var(--light-grey)",
  }
};

// Chart Tooltip Component
export function ChartTooltip({
  active,
  payload,
  label,
  className,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "border bg-[var(--lighter-grey)] p-2 shadow-sm",
          className
        )}
        style={{ 
          border: `1px solid var(--light-grey)`,
          color: `var(--dark-grey)`
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[0.70rem] uppercase font-medium">
            {label}
          </span>
          {payload.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2" 
                style={{ backgroundColor: item.fill || item.color }}
              />
              <span className="text-sm capitalize">{item.dataKey}:</span>
              <span className="text-sm font-medium">${item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// Bar Chart Component
export function CBRESimpleBarChart({
  data,
  className,
}: {
  data: ChartData[];
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartConfig.grid}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke={chartConfig.axis}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={chartConfig.axis}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `$${value}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar
            dataKey="total"
            fill={`var(--cbre-green)`}
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Line Chart Component
export function CBRESimpleLineChart({
  data,
  className,
}: {
  data: ChartData[];
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartConfig.grid}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke={chartConfig.axis}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={chartConfig.axis}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `$${value}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            dataKey="actual"
            stroke="var(--cbre-green)"
            strokeWidth={2}
            dot={true}
          />
          <Line
            dataKey="target"
            stroke="var(--accent-green)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pie Chart Component
export function CBRESimplePieChart({
  data,
  className,
}: {
  data: ChartData[];
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig.colors[index % chartConfig.colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Horizontal Bar Chart Component
export function CBREHorizontalBarChart({
  data,
  className,
}: {
  data: Array<{
    name: string;
    actual: number;
    target: number;
  }>;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartConfig.grid}
            horizontal={false}
          />
          <XAxis
            type="number"
            stroke={chartConfig.axis}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `$${value}`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke={chartConfig.axis}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="actual" fill="var(--celadon)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="target" fill="var(--wheat)" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 