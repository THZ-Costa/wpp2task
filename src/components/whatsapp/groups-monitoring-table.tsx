import { formatDateTime, formatNumber } from "@/lib/format";
import type { WhatsAppGroup } from "@/types/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type GroupsMonitoringTableProps = {
  groups: WhatsAppGroup[];
};

export function GroupsMonitoringTable({ groups }: GroupsMonitoringTableProps) {
  return (
    <Card className="rounded-lg">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Grupo</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Participantes</TableHead>
              <TableHead>Mensagens hoje</TableHead>
              <TableHead>Última mensagem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="pl-4 font-medium">{group.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {group.numberLabel}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      group.status === "monitored"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "border-border bg-muted/40 text-muted-foreground"
                    }
                  >
                    {group.status === "monitored" ? "Monitorado" : "Pausado"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatNumber(group.participantsCount)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatNumber(group.messagesToday)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(group.lastMessageAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
