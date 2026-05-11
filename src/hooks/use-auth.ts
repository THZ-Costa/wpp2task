"use client";

import { useQuery } from "@tanstack/react-query";

import { getAuthToken } from "@/lib/auth-token";
import { getAuthenticatedUser } from "@/services/auth-service";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: getAuthenticatedUser,
    enabled: typeof window !== "undefined" && Boolean(getAuthToken()),
    staleTime: 5 * 60_000,
  });
}
