import { Pencil, XCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { ApproveDemandModal } from "@/components/demands/approve-demand-modal";
import { DemandDetailCard } from "@/components/demands/demand-detail-card";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { getDemandById } from "@/services/demand-service";

type DemandDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DemandDetailPage({
  params,
}: DemandDetailPageProps) {
  const { id } = await params;
  const demand = await getDemandById(id);

  if (!demand) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={demand.title}
        description={`${demand.code} · ${demand.groupName}`}
        action={
          <>
            <Button variant="outline">
              <XCircle className="size-4" />
              Rejeitar
            </Button>
            <Button variant="outline">
              <Pencil className="size-4" />
              Editar
            </Button>
            <ApproveDemandModal demand={demand} />
          </>
        }
      />
      <DemandDetailCard demand={demand} />
    </>
  );
}
