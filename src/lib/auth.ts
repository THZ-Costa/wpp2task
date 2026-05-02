import type { User, UserRole } from "@/types/user";

export const mockCurrentUser: User = {
  id: "usr_001",
  name: "Marina Costa",
  email: "marina@acme.com",
  role: "admin",
  companyId: "cmp_acme",
  createdAt: "2026-04-10T10:30:00.000Z",
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function isMaster(user: Pick<User, "role">) {
  return user.role === "master";
}

export function hasRole(user: Pick<User, "role">, roles: UserRole[]) {
  return roles.includes(user.role);
}
