import { DemandsTable } from "@/components/demands/demands-table";
import { PageHeader } from "@/components/layout/page-header";
import { getDemands } from "@/services/demand-service";

export default async function DemandsPage() {
  const demands = await getDemands();

  return (
    <>
      <PageHeader
        title="Demandas"
        description="Revise incidentes, solicitações e melhorias identificadas nas conversas dos grupos."
      />
      <DemandsTable demands={demands} />
    </>
  );
}
