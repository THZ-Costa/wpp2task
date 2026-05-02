export type JiraIntegration = {
  connected: boolean;
  siteUrl: string;
  projectKey: string;
  issueType: string;
  lastSyncAt: string;
};

export async function getJiraIntegration(): Promise<JiraIntegration> {
  return {
    connected: true,
    siteUrl: "https://acme.atlassian.net",
    projectKey: "PLAT",
    issueType: "Task",
    lastSyncAt: "2026-05-02T10:40:00.000Z",
  };
}
