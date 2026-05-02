import {
  ClipboardList,
  MessageSquare,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { MessagesVolumeChart } from "@/components/dashboard/messages-volume-chart";
import { PendingDemandsList } from "@/components/dashboard/pending-demands-list";
import { PageHeader } from "@/components/layout/page-header";
import {
  getDashboardMetrics,
  getMessageVolume,
} from "@/services/dashboard-service";
import { getPendingDemands } from "@/services/demand-service";

export default async function DashboardPage() {
  const [metrics, messageVolume, pendingDemands] = await Promise.all([
    getDashboardMetrics(),
    getMessageVolume(),
    getPendingDemands(5),
  ]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visão geral dos grupos monitorados, mensagens processadas e demandas detectadas pela IA."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          title="Números ativos"
          value={metrics.activeNumbers}
          icon={Smartphone}
          description="Conectados ao monitoramento"
          tone="success"
        />
        <MetricCard
          title="Grupos monitorados"
          value={metrics.monitoredGroups}
          icon={Users}
          description="Com detecção habilitada"
        />
        <MetricCard
          title="Mensagens hoje"
          value={metrics.messagesToday}
          icon={MessageSquare}
          description="Processadas em batches"
        />
        <MetricCard
          title="Mensagens na semana"
          value={metrics.messagesThisWeek}
          icon={TrendingUp}
          description="Últimos 7 dias"
        />
        <MetricCard
          title="Demandas pendentes"
          value={metrics.pendingDemands}
          icon={ClipboardList}
          description="Aguardando aprovação"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <MessagesVolumeChart data={messageVolume} />
        <PendingDemandsList demands={pendingDemands} />
      </div>
    </>
  );
}
