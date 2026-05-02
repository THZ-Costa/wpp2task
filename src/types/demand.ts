export type DemandStatus =
  | "pending_approval"
  | "approved"
  | "rejected"
  | "jira_created";

export type DemandPriority = "low" | "medium" | "high" | "critical";

export type DemandType = "incident" | "request" | "improvement";

export type OriginalMessage = {
  id: string;
  authorName: string;
  body: string;
  sentAt: string;
};

export type Demand = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: DemandStatus;
  priority: DemandPriority;
  type: DemandType;
  groupId: string;
  groupName: string;
  authorName: string;
  detectedAt: string;
  createdAt: string;
  updatedAt: string;
  aiConfidence: number;
  jiraIssueKey?: string;
  originalMessages: OriginalMessage[];
};
