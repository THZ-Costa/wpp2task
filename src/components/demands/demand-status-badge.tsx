import type { DemandStatus } from "@/types/demand";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  DemandStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending_approval: {
    label: "Pendente",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  },
  approved: {
    label: "Aprovada",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  rejected: {
    label: "Rejeitada",
    className:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  },
  jira_created: {
    label: "Jira criado",
    className:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300",
  },
};

export function DemandStatusBadge({ status }: { status: DemandStatus }) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
