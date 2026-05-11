import { Plus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { GroupsMonitoringTable } from "@/components/whatsapp/groups-monitoring-table";
import { NumbersTable } from "@/components/whatsapp/numbers-table";
import { QrCodeModal } from "@/components/whatsapp/qr-code-modal";
import {
  getWhatsAppGroups,
  getWhatsAppNumbers,
} from "@/services/whatsapp-service";

export default async function WhatsAppPage() {
  const [numbers, groups] = await Promise.all([
    getWhatsAppNumbers(),
    getWhatsAppGroups(),
  ]);

  return (
    <>
      <PageHeader
        title="WhatsApp"
        description="Números empresariais conectados e grupos sob monitoramento da IA."
        action={
          <QrCodeModal>
            <Button>
              <Plus className="size-4" />
              Conectar número
            </Button>
          </QrCodeModal>
        }
      />

      <div className="space-y-8">
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Números</h2>
            <p className="text-sm text-muted-foreground">
              {numbers.length} {numbers.length === 1 ? "número" : "números"}{" "}
              conectados ao monitoramento.
            </p>
          </div>
          <NumbersTable numbers={numbers} />
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Grupos monitorados</h2>
            <p className="text-sm text-muted-foreground">
              {groups.length} {groups.length === 1 ? "grupo" : "grupos"}{" "}
              acompanhados em tempo real para análise por IA.
            </p>
          </div>
          <GroupsMonitoringTable groups={groups} />
        </section>
      </div>
    </>
  );
}
