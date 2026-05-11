export type UserRole = "master" | "admin" | "approver" | "analyst";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  companyId?: string;
  isActive?: boolean;
  createdAt: string;
};

export type UserApiResponse = {
  id: number;
  company_id: number | null;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export function mapUserFromApi(raw: UserApiResponse): User {
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    role: raw.role,
    companyId: raw.company_id != null ? String(raw.company_id) : undefined,
    isActive: raw.is_active,
    createdAt: raw.created_at,
  };
}
