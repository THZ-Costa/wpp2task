import axios from "axios";

type LaravelErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function getApiErrorMessage(error: unknown, fallback = "Erro inesperado. Tente novamente."): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as LaravelErrorBody | undefined;
    if (data?.errors) {
      const first = Object.values(data.errors)[0]?.[0];
      if (first) return first;
    }
    if (data?.message) return data.message;
    if (error.message && error.code !== "ERR_BAD_REQUEST") return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
