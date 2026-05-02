export type UserRole = "master" | "admin" | "approver" | "analyst";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  companyId?: string;
  createdAt: string;
};
