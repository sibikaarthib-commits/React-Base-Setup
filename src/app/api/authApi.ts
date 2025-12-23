import type { AxiosError } from "axios";
import { apiClient, setAuthToken } from "./httpClient";

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  user: {
    id: string;
    email: string;
  };
  token?: string;
};

export async function loginApi(payload: LoginRequestDto) {
  const res = await apiClient.post<LoginResponseDto>("/login", payload);

  if (res.data.token) {
    setAuthToken(res.data.token);
  }

  return res.data.user;
}

export function getApiErrorMessage(err: unknown): string {
  const axiosErr = err as AxiosError<any>;
  const msg =
    axiosErr?.response?.data?.message ??
    axiosErr?.response?.data?.error ??
    axiosErr?.message ??
    "Request failed";
  return typeof msg === "string" ? msg : "Request failed";
}


