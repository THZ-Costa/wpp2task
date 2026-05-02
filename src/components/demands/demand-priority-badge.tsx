import type { DemandPriority } from "@/types/demand";
import { Badge } from "@/components/ui/badge";

const priorityConfig: Record<
  DemandPriority,
  {
    label: string;
    className: string;
  }
> = {
  low: {
    label: "Baixa",
    className: "border-border bg-muted/40 text-muted-foreground",
  },
  medium: {
    label: "Média",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300",
  },
  high: {
    label: "Alta",
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300",
  },
  critical: {
    label: "Crítica",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
  },
};

export function DemandPriorityBadge({
  priority,
}: {
  priority: DemandPriority;
}) {
  const config = priorityConfig[priority];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
