import type { User } from "@/types/user";

export type LoginPayload = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type AuthSession = {
  user: User;
  token: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
