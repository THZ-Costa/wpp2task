import { ArrowDown, ArrowUp, Minus, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TopicTrend } from "@/types/summary";

type TopicTrendPillProps = {
  trend: TopicTrend;
};

export function TopicTrendPill({ trend }: TopicTrendPillProps) {
  if (trend.kind === "new") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
        <Sparkles className="size-3" />
        Novo
      </span>
    );
  }
  if (trend.kind === "flat") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
        <Minus className="size-3" />
        Estável
      </span>
    );
  }
  const Icon = trend.kind === "up" ? ArrowUp : ArrowDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        trend.kind === "up"
          ? "bg-rose-100 text-rose-900 dark:bg-rose-500/10 dark:text-rose-200"
          : "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200"
      )}
    >
      <Icon className="size-3" />
      {trend.percent}%
    </span>
  );
}
