import { PageHeader } from "@/components/layout/page-header";
import { CurrentPlanCard } from "@/components/billing/current-plan-card";
import { InvoicesTable } from "@/components/billing/invoices-table";
import {
  getBillingUsage,
  getCurrentPlan,
  getInvoices,
} from "@/services/billing-service";

export default async function BillingPage() {
  const [plan, usage, invoices] = await Promise.all([
    getCurrentPlan(),
    getBillingUsage(),
    getInvoices(),
  ]);

  return (
    <>
      <PageHeader
        title="Billing"
        description="Plano, uso contratado e histórico de faturas da empresa."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_520px]">
        <CurrentPlanCard
          plan={plan.plan}
          amount={plan.amount}
          renewalDate={plan.renewalDate}
          usage={usage}
        />
        <InvoicesTable invoices={invoices} />
      </div>
    </>
  );
}
