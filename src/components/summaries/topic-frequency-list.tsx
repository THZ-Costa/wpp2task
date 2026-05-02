import { Hash } from "lucide-react";

import { formatNumber } from "@/lib/format";
import type { SummaryTopic } from "@/types/summary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TopicFrequencyListProps = {
  topics: SummaryTopic[];
};

export function TopicFrequencyList({ topics }: TopicFrequencyListProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Tópicos frequentes</CardTitle>
        <CardDescription>Termos recorrentes nos batches recentes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between rounded-lg border bg-background p-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Hash className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">{topic.name}</p>
                <p className="text-xs text-muted-foreground">
                  Sentimento {topic.sentiment}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold">
              {formatNumber(topic.frequency)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
