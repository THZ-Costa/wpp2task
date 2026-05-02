import { PageHeader } from "@/components/layout/page-header";
import { TopicFrequencyList } from "@/components/summaries/topic-frequency-list";
import { getTopicFrequencies } from "@/services/summary-service";

export default async function TopicsPage() {
  const topics = await getTopicFrequencies();

  return (
    <>
      <PageHeader
        title="Tópicos"
        description="Tópicos mais recorrentes extraídos das conversas monitoradas."
      />
      <TopicFrequencyList topics={topics} />
    </>
  );
}
