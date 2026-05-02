import type { Company } from "@/types/company";
import type { AdminRevenueMetric } from "@/types/admin";

const companies: Company[] = [
  {
    id: "cmp_acme",
    name: "Acme Retail",
    slug: "acme-retail",
    plan: "scale",
    status: "active",
    whatsappNumbersLimit: 8,
    groupsLimit: 40,
    createdAt: "2026-03-08T12:00:00.000Z",
  },
  {
    id: "cmp_nortec",
    name: "Nortec Distribuidora",
    slug: "nortec",
    plan: "growth",
    status: "trialing",
    whatsappNumbersLimit: 4,
    groupsLimit: 20,
    createdAt: "2026-04-16T12:00:00.000Z",
  },
  {
    id: "cmp_atlante",
    name: "Atlante Serviços",
    slug: "atlante",
    plan: "enterprise",
    status: "active",
    whatsappNumbersLimit: 12,
    groupsLimit: 80,
    createdAt: "2026-02-21T12:00:00.000Z",
  },
];

export function getMockCompanies() {
  return companies;
}

export async function getAdminCompanies() {
  return companies;
}

export async function getRevenueMetrics(): Promise<AdminRevenueMetric[]> {
  return [
    { label: "MRR", value: 48600, change: 12.4 },
    { label: "Empresas ativas", value: 32, change: 8.1 },
    { label: "Contas trial", value: 7, change: -2.3 },
  ];
}
