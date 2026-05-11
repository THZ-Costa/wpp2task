import { PageHeader } from "@/components/layout/page-header";
import { TopicsRankingTable } from "@/components/topics/topics-ranking-table";
import { getTopicFrequencies } from "@/services/summary-service";

export default async function TopicsPage() {
  const topics = await getTopicFrequencies();

  return (
    <>
      <PageHeader
        title="Tópicos"
        description="Ranking dos tópicos mais frequentes — clique em um tópico para ver tendência, mensagens fonte e tópicos relacionados."
      />
      <TopicsRankingTable topics={topics} />
    </>
  );
}
