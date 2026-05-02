import type { Company } from "@/types/company";
import type { User } from "@/types/user";

export type LoginPayload = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterPayload = {
  name: string;
  email: string;
  companyName: string;
  password: string;
  passwordConfirmation: string;
};

export type AuthenticatedUser = {
  user: User;
  companies: Company[];
};
