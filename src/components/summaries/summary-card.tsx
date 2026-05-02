import { formatDateTime, formatNumber } from "@/lib/format";
import type { ConversationSummary } from "@/types/summary";
import { TopicBadgeList } from "@/components/summaries/topic-badge-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SummaryCardProps = {
  summary: ConversationSummary;
};

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>{summary.title}</CardTitle>
        <CardDescription>
          {summary.groupName} · {formatNumber(summary.messagesCount)} mensagens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {summary.summary}
        </p>
        <TopicBadgeList topics={summary.topics} />
        <p className="text-xs text-muted-foreground">
          Janela: {formatDateTime(summary.from)} até {formatDateTime(summary.to)}
        </p>
      </CardContent>
    </Card>
  );
}
