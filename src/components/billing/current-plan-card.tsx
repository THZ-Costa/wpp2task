import { formatCurrency, formatDateTime } from "@/lib/format";
import type { BillingUsage } from "@/types/billing";
import type { CompanyPlan } from "@/types/company";
import { UsageProgress } from "@/components/billing/usage-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CurrentPlanCardProps = {
  plan: CompanyPlan;
  amount: number;
  renewalDate: string;
  usage: BillingUsage[];
};

export function CurrentPlanCard({
  plan,
  amount,
  renewalDate,
  usage,
}: CurrentPlanCardProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Plano atual</CardTitle>
        <CardDescription>
          {plan} · {formatCurrency(amount)} / mês · renova em{" "}
          {formatDateTime(renewalDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {usage.map((item) => (
          <UsageProgress key={item.label} usage={item} />
        ))}
      </CardContent>
    </Card>
  );
}
