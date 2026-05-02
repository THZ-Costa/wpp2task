import type { BillingUsage } from "@/types/billing";

type UsageProgressProps = {
  usage: BillingUsage;
};

export function UsageProgress({ usage }: UsageProgressProps) {
  const percent = Math.min(100, Math.round((usage.used / usage.limit) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{usage.label}</span>
        <span className="text-muted-foreground">
          {usage.used.toLocaleString("pt-BR")} /{" "}
          {usage.limit.toLocaleString("pt-BR")}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
