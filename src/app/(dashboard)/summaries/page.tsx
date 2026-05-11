import { PageHeader } from "@/components/layout/page-header";
import { SummariesByGroup } from "@/components/summaries/summaries-by-group";
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
        description="Selecione um grupo na lateral para ver os batches consolidados pela IA com tópicos e sinais de demanda."
      />
      <SummariesByGroup summaries={summaries} topics={topics} />
    </>
  );
}
