import { PageHeader } from "@/components/layout/page-header";
import { GroupsMonitoringTable } from "@/components/whatsapp/groups-monitoring-table";
import { getWhatsAppGroups } from "@/services/whatsapp-service";

export default async function WhatsAppGroupsPage() {
  const groups = await getWhatsAppGroups();

  return (
    <>
      <PageHeader
        title="Grupos monitorados"
        description="Acompanhe quais grupos estão ativos para análise por IA e criação de demandas."
      />
      <GroupsMonitoringTable groups={groups} />
    </>
  );
}
