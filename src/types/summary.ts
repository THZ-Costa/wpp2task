export type SummaryTopic = {
  id: string;
  name: string;
  frequency: number;
  sentiment: "positive" | "neutral" | "negative";
};

export type ConversationSummary = {
  id: string;
  title: string;
  summary: string;
  groupId: string;
  groupName: string;
  topics: SummaryTopic[];
  messagesCount: number;
  from: string;
  to: string;
  createdAt: string;
};
