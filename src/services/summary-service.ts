import type { ConversationSummary, SummaryTopic } from "@/types/summary";

const topics: SummaryTopic[] = [
  { id: "top_001", name: "Checkout", frequency: 18, sentiment: "negative" },
  { id: "top_002", name: "Faturamento", frequency: 12, sentiment: "neutral" },
  { id: "top_003", name: "SLA", frequency: 9, sentiment: "neutral" },
  { id: "top_004", name: "Jira", frequency: 7, sentiment: "positive" },
];

const summaries: ConversationSummary[] = [
  {
    id: "sum_001",
    title: "Instabilidade no checkout para pedidos grandes",
    summary:
      "O grupo reportou erros 504 durante o fechamento de pedidos B2B com valores altos. Há indícios de impacto em clientes enterprise e recorrência em mais de uma tentativa.",
    groupId: "grp_ops",
    groupName: "Operações - Loja Online",
    topics: [topics[0]],
    messagesCount: 42,
    from: "2026-05-02T10:00:00.000Z",
    to: "2026-05-02T10:30:00.000Z",
    createdAt: "2026-05-02T10:35:00.000Z",
  },
  {
    id: "sum_002",
    title: "Pedidos de automação para notas rejeitadas",
    summary:
      "O time financeiro discutiu alertas para notas rejeitadas pela SEFAZ e sugeriu incluir motivo de rejeição com ação rápida de reprocessamento.",
    groupId: "grp_finance",
    groupName: "Financeiro - Faturamento",
    topics: [topics[1]],
    messagesCount: 28,
    from: "2026-05-02T09:00:00.000Z",
    to: "2026-05-02T09:30:00.000Z",
    createdAt: "2026-05-02T09:35:00.000Z",
  },
];

export async function getConversationSummaries() {
  return summaries;
}

export async function getTopicFrequencies() {
  return topics;
}
