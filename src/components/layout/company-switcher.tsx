"use client";

import { Building2 } from "lucide-react";

import { useCompany } from "@/hooks/use-company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CompanySwitcher() {
  const { companies, selectedCompanyId, setSelectedCompanyId } = useCompany();

  return (
    <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
      <SelectTrigger className="h-8 w-[190px] max-w-[44vw] bg-background">
        <Building2 className="size-4 text-muted-foreground" />
        <SelectValue placeholder="Empresa" />
      </SelectTrigger>
      <SelectContent align="start">
        {companies.map((company) => (
          <SelectItem key={company.id} value={company.id}>
            {company.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
