import type { LucideIcon } from "lucide-react";

import { formatNumber } from "@/lib/format";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  tone?: "neutral" | "success";
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  tone = "neutral",
}: MetricCardProps) {
  return (
    <Card size="sm" className="rounded-lg">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        <span
          className={
            tone === "success"
              ? "flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-900"
              : "flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground"
          }
        >
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-normal">
          {formatNumber(value)}
        </div>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
