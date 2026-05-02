import { PageHeader } from "@/components/layout/page-header";
import { GroupsMonitoringTable } from "@/components/whatsapp/groups-monitoring-table";
import { getWhatsAppGroups } from "@/services/whatsapp-service";

export default async function GroupActivityPage() {
  const groups = await getWhatsAppGroups();

  return (
    <>
      <PageHeader
        title="Atividade dos grupos"
        description="Volume recente por grupo e status de detecção de demandas."
      />
      <GroupsMonitoringTable groups={groups} />
    </>
  );
}
