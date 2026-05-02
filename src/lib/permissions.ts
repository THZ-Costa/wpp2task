import type { UserRole } from "@/types/user";

export type Permission =
  | "view_dashboard"
  | "view_demands"
  | "approve_demands"
  | "manage_company"
  | "manage_whatsapp"
  | "manage_jira"
  | "manage_billing"
  | "view_master_admin";

const rolePermissions: Record<UserRole, Permission[]> = {
  master: [
    "view_dashboard",
    "view_demands",
    "approve_demands",
    "manage_company",
    "manage_whatsapp",
    "manage_jira",
    "manage_billing",
    "view_master_admin",
  ],
  admin: [
    "view_dashboard",
    "view_demands",
    "approve_demands",
    "manage_company",
    "manage_whatsapp",
    "manage_jira",
    "manage_billing",
  ],
  approver: ["view_dashboard", "view_demands", "approve_demands"],
  analyst: ["view_dashboard", "view_demands"],
};

export function can(role: UserRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function getPermissions(role: UserRole) {
  return rolePermissions[role];
}
