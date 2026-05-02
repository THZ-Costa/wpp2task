"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { MessageVolumePoint } from "@/types/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type MessagesVolumeChartProps = {
  data: MessageVolumePoint[];
};

export function MessagesVolumeChart({ data }: MessagesVolumeChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Volume de mensagens</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                  <linearGradient
                    id="messages-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  minTickGap={22}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ stroke: "#10b981", strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(0 0% 88%)",
                    boxShadow: "0 12px 40px rgb(0 0 0 / 0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="messages"
                  name="Mensagens"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#messages-fill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <Skeleton className="h-full w-full rounded-lg" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
