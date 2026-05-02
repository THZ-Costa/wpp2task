"use client";

import { mockCurrentUser } from "@/lib/auth";
import { can, getPermissions, type Permission } from "@/lib/permissions";

export function usePermissions() {
  const role = mockCurrentUser.role;

  return {
    role,
    permissions: getPermissions(role),
    can: (permission: Permission) => can(role, permission),
  };
}
