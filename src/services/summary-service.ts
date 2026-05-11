import type {
  ConversationSummary,
  SummaryTopic,
  TopicSourceMessage,
} from "@/types/summary";

const topics: SummaryTopic[] = [
  {
    id: "top_001",
    slug: "checkout",
    name: "Checkout",
    frequency: 47,
    sentiment: "negative",
    trend: { kind: "up", percent: 38 },
    groupsCount: 3,
    firstAppearance: "2026-04-02T00:00:00.000Z",
    demandsCount: 4,
    sparkline: [4, 6, 8, 7, 9, 12, 14, 18, 22, 28, 35, 47],
    relatedTopics: ["Reembolso", "PIX", "Pedido grande", "504"],
  },
  {
    id: "top_002",
    slug: "pix",
    name: "PIX",
    frequency: 32,
    sentiment: "negative",
    trend: { kind: "up", percent: 120 },
    groupsCount: 2,
    firstAppearance: "2026-04-18T00:00:00.000Z",
    demandsCount: 2,
    sparkline: [0, 2, 3, 4, 6, 8, 12, 18, 22, 26, 30, 32],
    relatedTopics: ["Checkout", "Pagamento", "Falha"],
  },
  {
    id: "top_003",
    slug: "faturamento",
    name: "Faturamento",
    frequency: 28,
    sentiment: "neutral",
    trend: { kind: "flat" },
    groupsCount: 5,
    firstAppearance: "2026-03-15T00:00:00.000Z",
    demandsCount: 1,
    sparkline: [22, 24, 26, 27, 25, 28, 27, 28, 26, 28, 27, 28],
    relatedTopics: ["NF-e", "SEFAZ", "Reprocessamento"],
  },
  {
    id: "top_004",
    slug: "renovacao",
    name: "Renovação",
    frequency: 22,
    sentiment: "neutral",
    trend: { kind: "up", percent: 15 },
    groupsCount: 2,
    firstAppearance: "2026-04-22T00:00:00.000Z",
    demandsCount: 1,
    sparkline: [12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 22, 22],
    relatedTopics: ["Contrato", "Q4", "Preço"],
  },
  {
    id: "top_005",
    slug: "sla",
    name: "SLA",
    frequency: 19,
    sentiment: "neutral",
    trend: { kind: "down", percent: 8 },
    groupsCount: 4,
    firstAppearance: "2026-03-01T00:00:00.000Z",
    demandsCount: 0,
    sparkline: [25, 24, 22, 22, 21, 20, 21, 20, 19, 19, 19, 19],
    relatedTopics: ["Contrato", "Resposta", "Suporte"],
  },
  {
    id: "top_006",
    slug: "nf-e",
    name: "NF-e",
    frequency: 14,
    sentiment: "neutral",
    trend: { kind: "down", percent: 5 },
    groupsCount: 3,
    firstAppearance: "2026-02-20T00:00:00.000Z",
    demandsCount: 0,
    sparkline: [16, 15, 15, 14, 14, 15, 14, 13, 14, 14, 14, 14],
    relatedTopics: ["Faturamento", "SEFAZ"],
  },
  {
    id: "top_007",
    slug: "troca",
    name: "Troca",
    frequency: 12,
    sentiment: "neutral",
    trend: { kind: "flat" },
    groupsCount: 2,
    firstAppearance: "2026-03-10T00:00:00.000Z",
    demandsCount: 1,
    sparkline: [11, 11, 12, 12, 12, 11, 12, 12, 11, 12, 12, 12],
    relatedTopics: ["Pós-venda", "Devolução"],
  },
  {
    id: "top_008",
    slug: "bug-checkout",
    name: "Bug checkout",
    frequency: 9,
    sentiment: "negative",
    trend: { kind: "new" },
    groupsCount: 1,
    firstAppearance: "2026-04-23T00:00:00.000Z",
    demandsCount: 1,
    sparkline: [0, 0, 0, 0, 0, 1, 2, 3, 5, 6, 8, 9],
    relatedTopics: ["Checkout", "PIX"],
  },
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
    topics: [topics[2], topics[5]],
    messagesCount: 28,
    from: "2026-05-02T09:00:00.000Z",
    to: "2026-05-02T09:30:00.000Z",
    createdAt: "2026-05-02T09:35:00.000Z",
  },
  {
    id: "sum_003",
    title: "Renovação Q4 — alinhamento com Atlante",
    summary:
      "Conversas sobre renovação trimestral com cliente Atlante, dúvidas sobre faixa de preço e prazo de fechamento até final do mês.",
    groupId: "grp_success",
    groupName: "Customer Success Enterprise",
    topics: [topics[3]],
    messagesCount: 18,
    from: "2026-05-01T14:00:00.000Z",
    to: "2026-05-01T15:00:00.000Z",
    createdAt: "2026-05-01T15:05:00.000Z",
  },
];

const sourceMessagesByTopic: Record<string, TopicSourceMessage[]> = {
  checkout: [
    {
      id: "tmsg_001",
      groupName: "Operações - Loja Online",
      authorName: "Rafael Lima",
      body: "Caiu de novo o checkout, deu 504 quando tentei fechar a Nortec.",
      sentAt: "2026-05-02T10:16:00.000Z",
    },
    {
      id: "tmsg_002",
      groupName: "Operações - Loja Online",
      authorName: "Bianca Rocha",
      body: "Mesmo problema agora com a MegaSupply, prints anexados.",
      sentAt: "2026-05-02T10:23:00.000Z",
    },
    {
      id: "tmsg_003",
      groupName: "Suporte enterprise",
      authorName: "Igor Dias",
      body: "Cliente reclamou de timeout no checkout, pode ser o mesmo bug.",
      sentAt: "2026-05-01T17:42:00.000Z",
    },
  ],
};

export async function getConversationSummaries() {
  return summaries;
}

export async function getTopicFrequencies() {
  return topics;
}

export async function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export async function getTopicSourceMessages(slug: string) {
  return sourceMessagesByTopic[slug] ?? [];
}
