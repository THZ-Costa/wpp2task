import { TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/format";
import { getRevenueMetrics } from "@/services/admin-service";

export default async function AdminRevenuePage() {
  const metrics = await getRevenueMetrics();

  return (
    <>
      <PageHeader
        title="Receita"
        description="Indicadores financeiros globais para o perfil master."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} className="rounded-lg">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground">
                {metric.label}
              </CardTitle>
              <TrendingUp className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-normal">
                {metric.label === "MRR"
                  ? formatCurrency(metric.value)
                  : formatNumber(metric.value)}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {metric.change > 0 ? "+" : ""}
                {metric.change}% no período
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
