import { api } from "@/lib/axios";
import { clearAuthToken, setAuthToken } from "@/lib/auth-token";
import type {
  ApiResponse,
  AuthSession,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";
import { mapUserFromApi, type UserApiResponse } from "@/types/user";

type AuthApiPayload = {
  user: UserApiResponse;
  token: string;
};

function toSession(payload: AuthApiPayload): AuthSession {
  return {
    user: mapUserFromApi(payload.user),
    token: payload.token,
  };
}

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const { data } = await api.post<ApiResponse<AuthApiPayload>>("/auth/login", {
    email: payload.email,
    password: payload.password,
  });
  const session = toSession(data.data);
  setAuthToken(session.token);
  return session;
}

export async function register(payload: RegisterPayload): Promise<AuthSession> {
  const { data } = await api.post<ApiResponse<AuthApiPayload>>("/auth/register", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    password_confirmation: payload.passwordConfirmation,
  });
  const session = toSession(data.data);
  setAuthToken(session.token);
  return session;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } finally {
    clearAuthToken();
  }
}

export async function getAuthenticatedUser() {
  const { data } = await api.get<ApiResponse<UserApiResponse>>("/auth/me");
  return mapUserFromApi(data.data);
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<string> {
  const { data } = await api.post<ApiResponse<unknown>>("/auth/forgot-password", payload);
  return data.message;
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<string> {
  const { data } = await api.post<ApiResponse<unknown>>("/auth/reset-password", {
    token: payload.token,
    email: payload.email,
    password: payload.password,
    password_confirmation: payload.passwordConfirmation,
  });
  return data.message;
}
