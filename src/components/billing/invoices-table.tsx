import { formatCurrency, formatDateTime } from "@/lib/format";
import type { Invoice } from "@/types/billing";
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

type InvoicesTableProps = {
  invoices: Invoice[];
};

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <Card className="rounded-lg">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Fatura</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Emissão</TableHead>
              <TableHead>Vencimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="pl-4 font-medium">
                  {invoice.number}
                </TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(invoice.issuedAt)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(invoice.dueAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
