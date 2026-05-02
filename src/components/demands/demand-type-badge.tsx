import type { DemandType } from "@/types/demand";
import { Badge } from "@/components/ui/badge";

const typeConfig: Record<
  DemandType,
  {
    label: string;
    className: string;
  }
> = {
  incident: {
    label: "Incidente",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
  },
  request: {
    label: "Solicitação",
    className:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300",
  },
  improvement: {
    label: "Melhoria",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
};

export function DemandTypeBadge({ type }: { type: DemandType }) {
  const config = typeConfig[type];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
