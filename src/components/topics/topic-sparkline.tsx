"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Skeleton } from "@/components/ui/skeleton";

type TopicSparklineProps = {
  data: number[];
  height?: number;
};

export function TopicSparkline({ data, height = 80 }: TopicSparklineProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="w-full rounded" style={{ height }} />;
  }

  const points = data.map((value, index) => ({
    index,
    value,
  }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={points} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="topic-sparkline-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.32} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="index" hide />
          <YAxis hide />
          <Tooltip
            cursor={{ stroke: "#10b981", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(0 0% 88%)",
              boxShadow: "0 12px 40px rgb(0 0 0 / 0.08)",
              fontSize: 12,
            }}
            labelFormatter={() => ""}
            formatter={(value) => [`${value}`, "menções"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#topic-sparkline-fill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
