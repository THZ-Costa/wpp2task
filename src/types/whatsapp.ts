export type WhatsAppNumberStatus = "pending" | "connected" | "disconnected";

export type WhatsAppNumber = {
  id: string;
  label: string;
  phone: string;
  status: WhatsAppNumberStatus;
  groupsCount: number;
  lastSeenAt?: string;
  connectedAt?: string;
  createdAt: string;
};

export type WhatsAppGroupStatus = "monitored" | "paused";

export type WhatsAppGroup = {
  id: string;
  name: string;
  numberId: string;
  numberLabel: string;
  status: WhatsAppGroupStatus;
  participantsCount: number;
  messagesToday: number;
  lastMessageAt: string;
  demandDetectionEnabled: boolean;
};
