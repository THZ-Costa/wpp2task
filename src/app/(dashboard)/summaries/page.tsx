import { PageHeader } from "@/components/layout/page-header";
import { SummaryCard } from "@/components/summaries/summary-card";
import { TopicFrequencyList } from "@/components/summaries/topic-frequency-list";
import {
  getConversationSummaries,
  getTopicFrequencies,
} from "@/services/summary-service";

export default async function SummariesPage() {
  const [summaries, topics] = await Promise.all([
    getConversationSummaries(),
    getTopicFrequencies(),
  ]);

  return (
    <>
      <PageHeader
        title="Resumos"
        description="Batches consolidados pela IA com tópicos e sinais de demanda em cada grupo."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {summaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
        <TopicFrequencyList topics={topics} />
      </div>
    </>
  );
}
