"use client";

import { useMemo, useState } from "react";

import { getMockCompanies } from "@/services/admin-service";

export function useCompany() {
  const companies = useMemo(() => getMockCompanies(), []);
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id);
  const selectedCompany = companies.find(
    (company) => company.id === selectedCompanyId
  );

  return {
    companies,
    selectedCompany,
    selectedCompanyId,
    setSelectedCompanyId,
  };
}
