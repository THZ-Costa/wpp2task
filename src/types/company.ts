export type CompanyPlan = "starter" | "growth" | "scale" | "enterprise";

export type CompanyStatus = "active" | "trialing" | "past_due" | "canceled";

export type Company = {
  id: string;
  name: string;
  slug: string;
  plan: CompanyPlan;
  status: CompanyStatus;
  whatsappNumbersLimit: number;
  groupsLimit: number;
  createdAt: string;
};
