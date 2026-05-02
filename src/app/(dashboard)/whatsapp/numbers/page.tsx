import { Plus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { NumbersTable } from "@/components/whatsapp/numbers-table";
import { QrCodeModal } from "@/components/whatsapp/qr-code-modal";
import { getWhatsAppNumbers } from "@/services/whatsapp-service";

export default async function WhatsAppNumbersPage() {
  const numbers = await getWhatsAppNumbers();

  return (
    <>
      <PageHeader
        title="Números WhatsApp"
        description="Gerencie os números empresariais usados para monitorar grupos e capturar conversas."
        action={
          <QrCodeModal>
            <Button>
              <Plus className="size-4" />
              Adicionar Número
            </Button>
          </QrCodeModal>
        }
      />
      <NumbersTable numbers={numbers} />
    </>
  );
}
