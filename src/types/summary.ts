export type TopicTrend =
  | { kind: "up"; percent: number }
  | { kind: "down"; percent: number }
  | { kind: "flat" }
  | { kind: "new" };

export type SummaryTopic = {
  id: string;
  slug: string;
  name: string;
  frequency: number;
  sentiment: "positive" | "neutral" | "negative";
  trend: TopicTrend;
  groupsCount: number;
  firstAppearance: string;
  demandsCount: number;
  /** 7-30 points of frequency over time, oldest → newest */
  sparkline: number[];
  relatedTopics: string[];
};

export type TopicSourceMessage = {
  id: string;
  groupName: string;
  authorName: string;
  body: string;
  sentAt: string;
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
