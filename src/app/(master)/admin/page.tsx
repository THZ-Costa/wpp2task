import { Building2, DollarSign, Users } from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/layout/page-header";
import { getAdminCompanies, getRevenueMetrics } from "@/services/admin-service";

export default async function AdminPage() {
  const [companies, revenueMetrics] = await Promise.all([
    getAdminCompanies(),
    getRevenueMetrics(),
  ]);

  const mrr = revenueMetrics.find((metric) => metric.label === "MRR");

  return (
    <>
      <PageHeader
        title="Admin"
        description="Visão master da plataforma, empresas cadastradas e indicadores globais."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Empresas"
          value={companies.length}
          icon={Building2}
          description="Contas cadastradas"
        />
        <MetricCard
          title="Usuários monitorados"
          value={128}
          icon={Users}
          description="Entre admins, aprovadores e analistas"
        />
        <MetricCard
          title="MRR"
          value={mrr?.value ?? 0}
          icon={DollarSign}
          description="Receita recorrente mensal"
          tone="success"
        />
      </div>
    </>
  );
}
