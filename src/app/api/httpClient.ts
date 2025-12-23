import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";

export type ApiClientOptions = {
  baseURL?: string;
  timeoutMs?: number;
};

const AUTH_TOKEN_KEY = "auth_token";

export function setAuthToken(token: string | null) {
  try {
    if (!token) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return;
    }
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    // ignore storage errors
  }
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export type AuthErrorHandler = (status: number) => void;

let authErrorHandler: AuthErrorHandler | null = null;
export function setAuthErrorHandler(handler: AuthErrorHandler | null) {
  authErrorHandler = handler;
}

function defaultBaseUrl() {
  // Optional Vite env override
  const envBaseUrl = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return envBaseUrl ?? "";
}

export function createApiClient(options: ApiClientOptions = {}): AxiosInstance {
  const client = axios.create({
    baseURL: options.baseURL ?? defaultBaseUrl(),
    timeout: options.timeoutMs ?? 30_000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => {
      const status = err.response?.status;

      // Centralized auth handling (adjust if you implement refresh tokens later)
      if (status === 401 || status === 403) {
        setAuthToken(null);
        try {
          authErrorHandler?.(status);
        } catch {
          // no-op
        }

        // Keep it simple: force back to root so routing shows Login
        if (typeof window !== "undefined") {
          window.location.assign("/");
        }
      }

      return Promise.reject(err);
    }
  );

  return client;
}

export const apiClient = createApiClient();


