import { ArrowUpRight, Inbox } from "lucide-react";
import Link from "next/link";

import { formatDateTime } from "@/lib/format";
import type { Demand } from "@/types/demand";
import { DemandPriorityBadge } from "@/components/demands/demand-priority-badge";
import { DemandTypeBadge } from "@/components/demands/demand-type-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

type PendingDemandsListProps = {
  demands: Demand[];
};

export function PendingDemandsList({ demands }: PendingDemandsListProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Demandas pendentes</CardTitle>
        <CardDescription>Últimos itens aguardando aprovação</CardDescription>
      </CardHeader>
      <CardContent>
        {demands.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Sem demandas pendentes"
            description="Quando a IA identificar novas demandas, elas aparecerão aqui para revisão."
            className="min-h-64"
          />
        ) : (
          <div className="space-y-3">
            {demands.map((demand) => (
              <div
                key={demand.id}
                className="rounded-lg border bg-background p-3 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{demand.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {demand.code}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {demand.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link href={`/demands/${demand.id}`} aria-label="Abrir demanda">
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DemandPriorityBadge priority={demand.priority} />
                  <DemandTypeBadge type={demand.type} />
                  <span className="text-xs text-muted-foreground">
                    {demand.groupName} · {formatDateTime(demand.detectedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
