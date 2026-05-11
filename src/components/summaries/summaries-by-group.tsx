"use client";

import { Inbox, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { formatDateTime, formatNumber } from "@/lib/format";
import type { ConversationSummary, SummaryTopic } from "@/types/summary";
import { SummaryCard } from "@/components/summaries/summary-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

const ALL_GROUPS = "__all__";

type SummariesByGroupProps = {
  summaries: ConversationSummary[];
  topics: SummaryTopic[];
};

export function SummariesByGroup({
  summaries,
  topics,
}: SummariesByGroupProps) {
  const groups = useMemo(() => {
    const map = new Map<string, { id: string; name: string; count: number }>();
    summaries.forEach((summary) => {
      const existing = map.get(summary.groupId);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(summary.groupId, {
          id: summary.groupId,
          name: summary.groupName,
          count: 1,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [summaries]);

  const [selectedGroupId, setSelectedGroupId] = useState<string>(ALL_GROUPS);

  const filteredSummaries =
    selectedGroupId === ALL_GROUPS
      ? summaries
      : summaries.filter((summary) => summary.groupId === selectedGroupId);

  const headerLabel =
    selectedGroupId === ALL_GROUPS
      ? "Todos os grupos"
      : (groups.find((group) => group.id === selectedGroupId)?.name ??
        "Grupo");

  const totalMessages = filteredSummaries.reduce(
    (acc, summary) => acc + summary.messagesCount,
    0
  );

  const groupTopics = useMemo(() => {
    if (selectedGroupId === ALL_GROUPS) {
      return topics;
    }
    const groupTopicIds = new Set(
      filteredSummaries.flatMap((summary) =>
        summary.topics.map((topic) => topic.id)
      )
    );
    return topics.filter((topic) => groupTopicIds.has(topic.id));
  }, [filteredSummaries, selectedGroupId, topics]);

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Card className="h-fit rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="size-4 text-muted-foreground" />
            Grupos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <button
            type="button"
            onClick={() => setSelectedGroupId(ALL_GROUPS)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent",
              selectedGroupId === ALL_GROUPS
                ? "bg-accent font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            <span>Todos os grupos</span>
            <span className="text-xs tabular-nums">{summaries.length}</span>
          </button>
          {groups.map((group) => {
            const isActive = selectedGroupId === group.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroupId(group.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                  isActive
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span className="truncate">{group.name}</span>
                <span className="text-xs tabular-nums">{group.count}</span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{headerLabel}</h2>
          <p className="text-sm text-muted-foreground">
            {filteredSummaries.length}{" "}
            {filteredSummaries.length === 1 ? "resumo" : "resumos"} ·{" "}
            {formatNumber(totalMessages)} mensagens
            {filteredSummaries[0]
              ? ` · último em ${formatDateTime(filteredSummaries[0].createdAt)}`
              : ""}
          </p>
        </div>

        {filteredSummaries.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Sem resumos"
            description="Este grupo ainda não tem batches consolidados."
          />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredSummaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        )}

        {groupTopics.length > 0 ? (
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-base">Tópicos frequentes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {groupTopics.map((topic) => (
                <span
                  key={topic.id}
                  className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-0.5 text-xs"
                >
                  {topic.name}
                  <span className="text-muted-foreground">
                    · {topic.frequency}
                  </span>
                </span>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
