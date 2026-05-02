"use client";

import { useQuery } from "@tanstack/react-query";

import { mockCurrentUser } from "@/lib/auth";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => mockCurrentUser,
    staleTime: 5 * 60_000,
  });
}
