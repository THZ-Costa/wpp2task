import type { WhatsAppGroup, WhatsAppNumber } from "@/types/whatsapp";

const mockNumbers: WhatsAppNumber[] = [
  {
    id: "num_001",
    label: "Operações Brasil",
    phone: "+55 11 99876-1100",
    status: "connected",
    groupsCount: 8,
    lastSeenAt: "2026-05-02T10:55:00.000Z",
    connectedAt: "2026-04-12T14:00:00.000Z",
    createdAt: "2026-04-12T13:50:00.000Z",
  },
  {
    id: "num_002",
    label: "Financeiro",
    phone: "+55 85 98765-2211",
    status: "connected",
    groupsCount: 4,
    lastSeenAt: "2026-05-02T10:49:00.000Z",
    connectedAt: "2026-04-14T09:35:00.000Z",
    createdAt: "2026-04-14T09:22:00.000Z",
  },
  {
    id: "num_003",
    label: "CS Enterprise",
    phone: "+55 31 97654-8899",
    status: "pending",
    groupsCount: 0,
    createdAt: "2026-05-02T09:10:00.000Z",
  },
  {
    id: "num_004",
    label: "Implantação",
    phone: "+55 47 96543-7710",
    status: "disconnected",
    groupsCount: 3,
    lastSeenAt: "2026-05-01T18:30:00.000Z",
    connectedAt: "2026-04-18T11:12:00.000Z",
    createdAt: "2026-04-18T10:58:00.000Z",
  },
];

const mockGroups: WhatsAppGroup[] = [
  {
    id: "grp_ops",
    name: "Operações - Loja Online",
    numberId: "num_001",
    numberLabel: "Operações Brasil",
    status: "monitored",
    participantsCount: 38,
    messagesToday: 426,
    lastMessageAt: "2026-05-02T10:55:00.000Z",
    demandDetectionEnabled: true,
  },
  {
    id: "grp_finance",
    name: "Financeiro - Faturamento",
    numberId: "num_002",
    numberLabel: "Financeiro",
    status: "monitored",
    participantsCount: 21,
    messagesToday: 173,
    lastMessageAt: "2026-05-02T10:48:00.000Z",
    demandDetectionEnabled: true,
  },
  {
    id: "grp_success",
    name: "Customer Success Enterprise",
    numberId: "num_001",
    numberLabel: "Operações Brasil",
    status: "monitored",
    participantsCount: 29,
    messagesToday: 251,
    lastMessageAt: "2026-05-02T10:42:00.000Z",
    demandDetectionEnabled: true,
  },
  {
    id: "grp_implantacao",
    name: "Implantação - Clientes",
    numberId: "num_004",
    numberLabel: "Implantação",
    status: "paused",
    participantsCount: 17,
    messagesToday: 0,
    lastMessageAt: "2026-05-01T18:20:00.000Z",
    demandDetectionEnabled: false,
  },
];

export async function getWhatsAppNumbers() {
  return mockNumbers;
}

export async function getWhatsAppGroups() {
  return mockGroups;
}
