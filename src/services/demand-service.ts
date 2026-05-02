import type { Demand } from "@/types/demand";

const mockDemands: Demand[] = [
  {
    id: "dem_001",
    code: "W2T-184",
    title: "Falha intermitente no checkout B2B",
    description:
      "A IA consolidou relatos de instabilidade no checkout B2B durante tentativas de fechamento de pedidos acima de R$ 25 mil. Os usuários mencionaram timeout após confirmar condições comerciais.",
    status: "pending_approval",
    priority: "critical",
    type: "incident",
    groupId: "grp_ops",
    groupName: "Operações - Loja Online",
    authorName: "Rafael Lima",
    detectedAt: "2026-05-02T10:45:00.000Z",
    createdAt: "2026-05-02T10:50:00.000Z",
    updatedAt: "2026-05-02T10:50:00.000Z",
    aiConfidence: 0.94,
    originalMessages: [
      {
        id: "msg_001",
        authorName: "Rafael Lima",
        body: "O checkout caiu de novo quando tentei fechar o pedido da Nortec. Fica carregando e volta erro 504.",
        sentAt: "2026-05-02T10:16:00.000Z",
      },
      {
        id: "msg_002",
        authorName: "Bianca Rocha",
        body: "Também recebi print do cliente MegaSupply com o mesmo timeout depois de aceitar as condições.",
        sentAt: "2026-05-02T10:23:00.000Z",
      },
      {
        id: "msg_003",
        authorName: "Rafael Lima",
        body: "Parece acontecer só nos pedidos grandes, acima de 25 mil.",
        sentAt: "2026-05-02T10:31:00.000Z",
      },
    ],
  },
  {
    id: "dem_002",
    code: "W2T-183",
    title: "Adicionar alerta para notas fiscais rejeitadas",
    description:
      "O grupo pediu um alerta automático quando uma nota fiscal for rejeitada pela SEFAZ, com indicação do motivo e link direto para reprocessamento.",
    status: "pending_approval",
    priority: "high",
    type: "improvement",
    groupId: "grp_finance",
    groupName: "Financeiro - Faturamento",
    authorName: "Camila Nunes",
    detectedAt: "2026-05-02T09:35:00.000Z",
    createdAt: "2026-05-02T09:40:00.000Z",
    updatedAt: "2026-05-02T09:40:00.000Z",
    aiConfidence: 0.89,
    originalMessages: [
      {
        id: "msg_004",
        authorName: "Camila Nunes",
        body: "Seria ótimo o sistema avisar quando a nota for rejeitada, hoje a gente só descobre quando alguém confere manualmente.",
        sentAt: "2026-05-02T09:08:00.000Z",
      },
      {
        id: "msg_005",
        authorName: "Leo Martins",
        body: "Se vier com o motivo da rejeição e um botão para reprocessar, resolve boa parte do retrabalho.",
        sentAt: "2026-05-02T09:12:00.000Z",
      },
    ],
  },
  {
    id: "dem_003",
    code: "W2T-182",
    title: "Cliente solicita relatório de SLA por contrato",
    description:
      "Solicitação de novo relatório por contrato com tempo médio de resposta, violações de SLA e exportação em CSV para reunião mensal com clientes enterprise.",
    status: "pending_approval",
    priority: "medium",
    type: "request",
    groupId: "grp_success",
    groupName: "Customer Success Enterprise",
    authorName: "Paula Azevedo",
    detectedAt: "2026-05-01T18:05:00.000Z",
    createdAt: "2026-05-01T18:10:00.000Z",
    updatedAt: "2026-05-01T18:10:00.000Z",
    aiConfidence: 0.86,
    originalMessages: [
      {
        id: "msg_006",
        authorName: "Paula Azevedo",
        body: "A Atlante pediu relatório de SLA separado por contrato para a QBR de maio.",
        sentAt: "2026-05-01T17:42:00.000Z",
      },
      {
        id: "msg_007",
        authorName: "Igor Dias",
        body: "Precisa ter tempo médio de resposta, violações e CSV. Hoje puxo isso manualmente.",
        sentAt: "2026-05-01T17:51:00.000Z",
      },
    ],
  },
  {
    id: "dem_004",
    code: "W2T-181",
    title: "Integração Jira não retornou chave do card",
    description:
      "Após aprovação de uma demanda, o card foi criado no Jira, mas a chave não voltou para o wpp2task. O usuário pediu rastreabilidade no histórico da demanda.",
    status: "jira_created",
    priority: "high",
    type: "incident",
    groupId: "grp_product",
    groupName: "Produto - Plataforma",
    authorName: "Davi Freitas",
    detectedAt: "2026-05-01T15:15:00.000Z",
    createdAt: "2026-05-01T15:20:00.000Z",
    updatedAt: "2026-05-01T16:04:00.000Z",
    aiConfidence: 0.91,
    jiraIssueKey: "PLAT-4289",
    originalMessages: [
      {
        id: "msg_008",
        authorName: "Davi Freitas",
        body: "A demanda entrou no Jira, mas o wpp2task não mostrou o número do card.",
        sentAt: "2026-05-01T15:00:00.000Z",
      },
    ],
  },
  {
    id: "dem_005",
    code: "W2T-180",
    title: "Melhorar busca por tópicos nos resumos",
    description:
      "Sugestão para permitir busca por tópico dentro dos resumos gerados pela IA, incluindo filtros por período e por grupo monitorado.",
    status: "approved",
    priority: "low",
    type: "improvement",
    groupId: "grp_product",
    groupName: "Produto - Plataforma",
    authorName: "Nina Prado",
    detectedAt: "2026-04-30T14:20:00.000Z",
    createdAt: "2026-04-30T14:24:00.000Z",
    updatedAt: "2026-04-30T16:04:00.000Z",
    aiConfidence: 0.78,
    originalMessages: [
      {
        id: "msg_009",
        authorName: "Nina Prado",
        body: "Seria bom buscar por tópico nos resumos, principalmente quando há muita conversa do mesmo grupo.",
        sentAt: "2026-04-30T14:02:00.000Z",
      },
    ],
  },
  {
    id: "dem_006",
    code: "W2T-179",
    title: "Remover grupo duplicado do monitoramento",
    description:
      "O grupo de implantação foi cadastrado duas vezes para o mesmo número. A demanda foi rejeitada porque já havia uma correção operacional em andamento.",
    status: "rejected",
    priority: "medium",
    type: "request",
    groupId: "grp_implantacao",
    groupName: "Implantação - Clientes",
    authorName: "Sofia Teixeira",
    detectedAt: "2026-04-29T11:10:00.000Z",
    createdAt: "2026-04-29T11:18:00.000Z",
    updatedAt: "2026-04-29T13:04:00.000Z",
    aiConfidence: 0.73,
    originalMessages: [
      {
        id: "msg_010",
        authorName: "Sofia Teixeira",
        body: "Esse grupo apareceu duplicado de novo na listagem.",
        sentAt: "2026-04-29T10:58:00.000Z",
      },
    ],
  },
];

export async function getDemands() {
  return mockDemands;
}

export async function getDemandById(id: string) {
  return mockDemands.find((demand) => demand.id === id);
}

export async function getPendingDemands(limit = 5) {
  return mockDemands
    .filter((demand) => demand.status === "pending_approval")
    .slice(0, limit);
}

export function getDemandGroups() {
  return Array.from(new Set(mockDemands.map((demand) => demand.groupName)));
}
