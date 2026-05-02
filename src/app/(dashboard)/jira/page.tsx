import { ExternalLink, Plug } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/format";
import { getJiraIntegration } from "@/services/jira-service";

export default async function JiraPage() {
  const integration = await getJiraIntegration();

  return (
    <>
      <PageHeader
        title="Integração Jira"
        description="Configuração da criação automática de cards a partir de demandas aprovadas."
        action={
          <Button variant="outline">
            <ExternalLink className="size-4" />
            Abrir Jira
          </Button>
        }
      />

      <Card className="max-w-2xl rounded-lg">
        <CardHeader>
          <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-900">
            <Plug className="size-5" />
          </div>
          <CardTitle>Conexão ativa</CardTitle>
          <CardDescription>{integration.siteUrl}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Projeto</dt>
              <dd className="mt-1 font-medium">{integration.projectKey}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Issue type</dt>
              <dd className="mt-1 font-medium">{integration.issueType}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Última sync</dt>
              <dd className="mt-1 font-medium">
                {formatDateTime(integration.lastSyncAt)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </>
  );
}
