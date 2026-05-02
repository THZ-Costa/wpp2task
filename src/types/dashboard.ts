export type DashboardMetrics = {
  activeNumbers: number;
  monitoredGroups: number;
  messagesToday: number;
  messagesThisWeek: number;
  pendingDemands: number;
  approvalRate: number;
};

export type MessageVolumePoint = {
  date: string;
  label: string;
  messages: number;
  demands: number;
};
