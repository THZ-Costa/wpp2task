export type InvoiceStatus = "paid" | "open" | "void" | "overdue";

export type Invoice = {
  id: string;
  number: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
};

export type BillingUsage = {
  label: string;
  used: number;
  limit: number;
};
