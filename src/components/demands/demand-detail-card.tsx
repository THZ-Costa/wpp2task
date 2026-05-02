import { Bot, MessageSquareText } from "lucide-react";

import { formatDateTime, formatPercent } from "@/lib/format";
import type { Demand } from "@/types/demand";
import { DemandPriorityBadge } from "@/components/demands/demand-priority-badge";
import { DemandStatusBadge } from "@/components/demands/demand-status-badge";
import { DemandTypeBadge } from "@/components/demands/demand-type-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DemandDetailCardProps = {
  demand: Demand;
};

export function DemandDetailCard({ demand }: DemandDetailCardProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bot className="size-4" />
            Descrição gerada pela IA
          </div>
          <CardTitle className="text-xl">{demand.title}</CardTitle>
          <CardDescription>{demand.code}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="leading-7 text-muted-foreground">
            {demand.description}
          </p>

          <Separator />

          <section>
            <div className="mb-3 flex items-center gap-2">
              <MessageSquareText className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Mensagens originais</h2>
            </div>
            <div className="space-y-3">
              {demand.originalMessages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-lg border bg-background p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{message.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(message.sentAt)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {message.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      <Card className="h-fit rounded-lg">
        <CardHeader>
          <CardTitle>Detalhes</CardTitle>
          <CardDescription>Contexto da demanda detectada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <DemandStatusBadge status={demand.status} />
            <DemandPriorityBadge priority={demand.priority} />
            <DemandTypeBadge type={demand.type} />
          </div>

          <Separator />

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Autor</dt>
              <dd className="mt-1 font-medium">{demand.authorName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Grupo</dt>
              <dd className="mt-1 font-medium">{demand.groupName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Detectada em</dt>
              <dd className="mt-1 font-medium">
                {formatDateTime(demand.detectedAt)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Criada em</dt>
              <dd className="mt-1 font-medium">
                {formatDateTime(demand.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Confiança da IA</dt>
              <dd className="mt-1 font-medium">
                {formatPercent(demand.aiConfidence * 100)}
              </dd>
            </div>
            {demand.jiraIssueKey ? (
              <div>
                <dt className="text-muted-foreground">Jira</dt>
                <dd className="mt-1 font-medium">{demand.jiraIssueKey}</dd>
              </div>
            ) : null}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
