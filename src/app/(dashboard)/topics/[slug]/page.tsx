import { Hash, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDateTime, formatNumber } from "@/lib/format";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/layout/page-header";
import { TopicSparkline } from "@/components/topics/topic-sparkline";
import { TopicTrendPill } from "@/components/topics/topic-trend-pill";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getTopicBySlug,
  getTopicSourceMessages,
} from "@/services/summary-service";

type TopicDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const sourceMessages = await getTopicSourceMessages(slug);

  return (
    <>
      <nav className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/topics" className="hover:text-foreground hover:underline">
          Tópicos
        </Link>
        <span>›</span>
        <span className="text-foreground">{topic.name}</span>
      </nav>

      <PageHeader
        title={topic.name}
        description={`Detectado em ${formatNumber(topic.groupsCount)} grupos · primeira aparição em ${formatDateTime(topic.firstAppearance).slice(0, 10)}`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          title="Menções (7d)"
          value={topic.frequency}
          icon={Hash}
          description="Total no período"
        />
        <MetricCard
          title="Grupos"
          value={topic.groupsCount}
          icon={Hash}
          description="Onde foi mencionado"
        />
        <MetricCard
          title="Demandas geradas"
          value={topic.demandsCount}
          icon={Hash}
          description="A partir deste tópico"
          tone={topic.demandsCount > 0 ? "success" : "neutral"}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <Card className="rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Frequência ao longo do tempo</CardTitle>
                <TopicTrendPill trend={topic.trend} />
              </div>
              <CardDescription>Últimos 30 dias (mensal)</CardDescription>
            </CardHeader>
            <CardContent>
              <TopicSparkline data={topic.sparkline} height={140} />
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Mensagens fonte</CardTitle>
              <CardDescription>
                {formatNumber(sourceMessages.length)} mensagens recentes
                mencionando &ldquo;{topic.name}&rdquo;
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sourceMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Sem mensagens fonte registradas para este tópico.
                </p>
              ) : (
                sourceMessages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border bg-background p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquareText className="size-3.5" />
                        {message.authorName} · {message.groupName}
                      </span>
                      <span>{formatDateTime(message.sentAt)}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {message.body}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit rounded-lg">
          <CardHeader>
            <CardTitle>Tópicos relacionados</CardTitle>
            <CardDescription>
              Co-ocorrem com frequência nas mesmas conversas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topic.relatedTopics.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum tópico relacionado identificado ainda.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {topic.relatedTopics.map((related) => (
                  <Badge key={related} variant="secondary">
                    {related}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
