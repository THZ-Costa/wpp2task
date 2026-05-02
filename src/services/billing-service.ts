import type { BillingUsage, Invoice } from "@/types/billing";
import type { CompanyPlan } from "@/types/company";

export async function getCurrentPlan(): Promise<{
  plan: CompanyPlan;
  amount: number;
  renewalDate: string;
}> {
  return {
    plan: "scale",
    amount: 2490,
    renewalDate: "2026-05-20T00:00:00.000Z",
  };
}

export async function getBillingUsage(): Promise<BillingUsage[]> {
  return [
    { label: "Números WhatsApp", used: 4, limit: 8 },
    { label: "Grupos monitorados", used: 18, limit: 40 },
    { label: "Mensagens no mês", used: 38420, limit: 80000 },
  ];
}

export async function getInvoices(): Promise<Invoice[]> {
  return [
    {
      id: "inv_001",
      number: "INV-2026-0501",
      amount: 2490,
      status: "paid",
      issuedAt: "2026-05-01T00:00:00.000Z",
      dueAt: "2026-05-10T00:00:00.000Z",
    },
    {
      id: "inv_002",
      number: "INV-2026-0401",
      amount: 2490,
      status: "paid",
      issuedAt: "2026-04-01T00:00:00.000Z",
      dueAt: "2026-04-10T00:00:00.000Z",
    },
  ];
}
