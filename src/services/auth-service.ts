import { api } from "@/lib/axios";
import type {
  AuthenticatedUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

export async function getCsrfCookie() {
  await api.get("/sanctum/csrf-cookie");
}

export async function login(payload: LoginPayload) {
  await getCsrfCookie();
  const { data } = await api.post<AuthenticatedUser>("/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  await getCsrfCookie();
  const { data } = await api.post<AuthenticatedUser>("/register", payload);
  return data;
}

export async function logout() {
  await api.post("/logout");
}

export async function getAuthenticatedUser() {
  const { data } = await api.get<AuthenticatedUser>("/user");
  return data;
}
