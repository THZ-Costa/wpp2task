import { DemandsListPanel } from "@/components/demands/demands-list-panel";
import { PageHeader } from "@/components/layout/page-header";
import { getDemands } from "@/services/demand-service";

export default async function DemandsPage() {
  const demands = await getDemands();

  return (
    <>
      <PageHeader
        title="Demandas"
        description="Triagem rápida das demandas detectadas pela IA — selecione na lista para ver o contexto e aprovar."
      />
      <DemandsListPanel demands={demands} />
    </>
  );
}
