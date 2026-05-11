"use client";

import { Bot, Inbox, MessageSquareText, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { formatDateTime, formatPercent } from "@/lib/format";
import type {
  Demand,
  DemandPriority,
  DemandStatus,
  DemandType,
} from "@/types/demand";
import { ApproveDemandModal } from "@/components/demands/approve-demand-modal";
import { DemandPriorityBadge } from "@/components/demands/demand-priority-badge";
import { DemandStatusBadge } from "@/components/demands/demand-status-badge";
import { DemandTypeBadge } from "@/components/demands/demand-type-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type FilterStatus = DemandStatus | "all";
type FilterPriority = DemandPriority | "all";
type FilterType = DemandType | "all";

type DemandsListPanelProps = {
  demands: Demand[];
};

export function DemandsListPanel({ demands }: DemandsListPanelProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [priority, setPriority] = useState<FilterPriority>("all");
  const [type, setType] = useState<FilterType>("all");
  const [group, setGroup] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    demands[0]?.id ?? null
  );

  const groups = useMemo(
    () => Array.from(new Set(demands.map((demand) => demand.groupName))),
    [demands]
  );

  const filteredDemands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return demands.filter((demand) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          demand.code,
          demand.title,
          demand.description,
          demand.groupName,
          demand.authorName,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        (status === "all" || demand.status === status) &&
        (priority === "all" || demand.priority === priority) &&
        (type === "all" || demand.type === type) &&
        (group === "all" || demand.groupName === group)
      );
    });
  }, [demands, group, priority, query, status, type]);

  const selectedDemand =
    demands.find((demand) => demand.id === selectedId) ??
    filteredDemands[0] ??
    null;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <div className="flex min-h-0 flex-col gap-3">
        <Card className="rounded-lg">
          <CardContent className="space-y-2 pt-0">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por título, código ou grupo"
                className="h-8 bg-background pl-8"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as FilterStatus)}
              >
                <SelectTrigger className="h-8 w-full bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending_approval">Pendente</SelectItem>
                  <SelectItem value="approved">Aprovada</SelectItem>
                  <SelectItem value="rejected">Rejeitada</SelectItem>
                  <SelectItem value="jira_created">Jira criado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={priority}
                onValueChange={(value) =>
                  setPriority(value as FilterPriority)
                }
              >
                <SelectTrigger className="h-8 w-full bg-background">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas prioridades</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={type}
                onValueChange={(value) => setType(value as FilterType)}
              >
                <SelectTrigger className="h-8 w-full bg-background">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos tipos</SelectItem>
                  <SelectItem value="incident">Incidente</SelectItem>
                  <SelectItem value="request">Solicitação</SelectItem>
                  <SelectItem value="improvement">Melhoria</SelectItem>
                </SelectContent>
              </Select>

              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger className="h-8 w-full bg-background">
                  <SelectValue placeholder="Grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos grupos</SelectItem>
                  {groups.map((groupName) => (
                    <SelectItem key={groupName} value={groupName}>
                      {groupName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 overflow-auto">
          {filteredDemands.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Nenhuma demanda encontrada"
              description="Ajuste os filtros para ver outras demandas."
            />
          ) : (
            <ul className="space-y-2">
              {filteredDemands.map((demand) => {
                const isSelected = demand.id === selectedDemand?.id;
                return (
                  <li key={demand.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(demand.id)}
                      className={cn(
                        "w-full rounded-lg border bg-card p-3 text-left transition-colors hover:border-foreground/20 hover:bg-accent/40",
                        isSelected &&
                          "border-foreground/40 bg-accent ring-1 ring-foreground/10"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          {demand.code} · {demand.groupName}
                        </span>
                        <DemandStatusBadge status={demand.status} />
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm font-medium">
                        {demand.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {demand.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <DemandPriorityBadge priority={demand.priority} />
                        <span>·</span>
                        <span>{formatDateTime(demand.detectedAt)}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {selectedDemand ? (
        <DemandPanel demand={selectedDemand} />
      ) : (
        <Card className="rounded-lg">
          <CardContent className="flex h-full items-center justify-center py-12 text-sm text-muted-foreground">
            Selecione uma demanda para ver os detalhes.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function DemandPanel({ demand }: { demand: Demand }) {
  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {demand.code} · {demand.groupName} · detectada em{" "}
              {formatDateTime(demand.detectedAt)}
            </p>
            <h2 className="mt-1 text-xl font-semibold leading-tight">
              {demand.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <DemandStatusBadge status={demand.status} />
              <DemandPriorityBadge priority={demand.priority} />
              <DemandTypeBadge type={demand.type} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/demands/${demand.id}`}>Abrir página</Link>
            </Button>
            <Button variant="outline" size="sm">
              Rejeitar
            </Button>
            <ApproveDemandModal demand={demand} />
          </div>
        </div>

        <Separator />

        <section>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Bot className="size-4 text-muted-foreground" />
            Resumo da IA
            <span className="text-xs font-normal text-muted-foreground">
              · confiança {formatPercent(demand.aiConfidence * 100)}
            </span>
          </div>
          <p className="leading-7 text-muted-foreground">
            {demand.description}
          </p>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <MessageSquareText className="size-4 text-muted-foreground" />
            Mensagens fonte ({demand.originalMessages.length})
          </div>
          <div className="space-y-2">
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
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {message.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Sugestão para Jira
          </p>
          <div className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Projeto</p>
              <p className="font-medium">SUPP</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tipo</p>
              <p className="font-medium capitalize">{demand.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Prioridade</p>
              <p className="font-medium capitalize">{demand.priority}</p>
            </div>
          </div>
          {demand.jiraIssueKey ? (
            <p className="mt-2 text-sm">
              <span className="text-muted-foreground">Issue criada: </span>
              <span className="font-medium">{demand.jiraIssueKey}</span>
            </p>
          ) : null}
        </section>
      </CardContent>
    </Card>
  );
}
