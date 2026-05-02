"use client";

import { Inbox, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { formatDateTime } from "@/lib/format";
import type {
  Demand,
  DemandPriority,
  DemandStatus,
  DemandType,
} from "@/types/demand";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FilterStatus = DemandStatus | "all";
type FilterPriority = DemandPriority | "all";
type FilterType = DemandType | "all";

type DemandsTableProps = {
  demands: Demand[];
};

export function DemandsTable({ demands }: DemandsTableProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [priority, setPriority] = useState<FilterPriority>("all");
  const [type, setType] = useState<FilterType>("all");
  const [group, setGroup] = useState("all");

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

  return (
    <div className="space-y-4">
      <Card className="rounded-lg">
        <CardContent className="pt-0">
          <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_repeat(4,minmax(130px,auto))]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por título, código ou grupo"
                className="h-8 bg-background pl-8"
              />
            </div>

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
              onValueChange={(value) => setPriority(value as FilterPriority)}
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

      {filteredDemands.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Nenhuma demanda encontrada"
          description="Ajuste os filtros ou aguarde novas demandas identificadas nos grupos monitorados."
        />
      ) : (
        <Card className="rounded-lg">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Demanda</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Grupo</TableHead>
                  <TableHead>Detectada em</TableHead>
                  <TableHead className="pr-4 text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDemands.map((demand) => (
                  <TableRow key={demand.id}>
                    <TableCell className="max-w-[340px] pl-4">
                      <div className="font-medium">{demand.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {demand.code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DemandStatusBadge status={demand.status} />
                    </TableCell>
                    <TableCell>
                      <DemandPriorityBadge priority={demand.priority} />
                    </TableCell>
                    <TableCell>
                      <DemandTypeBadge type={demand.type} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {demand.groupName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(demand.detectedAt)}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/demands/${demand.id}`}>Abrir</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
