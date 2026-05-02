import { Inbox, QrCode } from "lucide-react";

import { formatDateTime } from "@/lib/format";
import type { WhatsAppNumber, WhatsAppNumberStatus } from "@/types/whatsapp";
import { QrCodeModal } from "@/components/whatsapp/qr-code-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusConfig: Record<
  WhatsAppNumberStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pendente",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  },
  connected: {
    label: "Conectado",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  disconnected: {
    label: "Desconectado",
    className:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  },
};

function NumberStatusBadge({ status }: { status: WhatsAppNumberStatus }) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

type NumbersTableProps = {
  numbers: WhatsAppNumber[];
};

export function NumbersTable({ numbers }: NumbersTableProps) {
  if (numbers.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Nenhum número conectado"
        description="Adicione um número empresarial para iniciar o monitoramento dos grupos."
        action={
          <QrCodeModal>
            <Button>
              <QrCode className="size-4" />
              Adicionar Número
            </Button>
          </QrCodeModal>
        }
      />
    );
  }

  return (
    <Card className="rounded-lg">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Grupos</TableHead>
              <TableHead>Última atividade</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="pr-4 text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {numbers.map((number) => (
              <TableRow key={number.id}>
                <TableCell className="pl-4">
                  <div className="font-medium">{number.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {number.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <NumberStatusBadge status={number.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {number.groupsCount}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(number.lastSeenAt)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(number.createdAt)}
                </TableCell>
                <TableCell className="pr-4 text-right">
                  {number.status === "pending" ? (
                    <QrCodeModal>
                      <Button variant="outline" size="sm">
                        <QrCode className="size-4" />
                        QR code
                      </Button>
                    </QrCodeModal>
                  ) : (
                    <Button variant="outline" size="sm">
                      Gerenciar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
