import { PageHeader } from "@/components/layout/page-header";
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
import { getAdminCompanies } from "@/services/admin-service";

export default async function AdminCompaniesPage() {
  const companies = await getAdminCompanies();

  return (
    <>
      <PageHeader
        title="Empresas"
        description="Contas B2B cadastradas, plano e limites contratados."
      />
      <Card className="rounded-lg">
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Empresa</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Números</TableHead>
                <TableHead>Grupos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="pl-4 font-medium">
                    {company.name}
                    <div className="mt-1 text-xs text-muted-foreground">
                      {company.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{company.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {company.whatsappNumbersLimit}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {company.groupsLimit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
