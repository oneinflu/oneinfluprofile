const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://newyearbackendcode-zrp62.ondigitalocean.app";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  status: number;
  data?: any;
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

export async function request<T = unknown>(
  path: string,
  { method = "GET", body, token, headers = {}, signal }: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const finalHeaders: Record<string, string> = { ...headers };
  if (!(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
  }
  if (token) finalHeaders.Authorization = `Bearer ${token}`;
  const init: RequestInit = { method, headers: finalHeaders, signal };
  if (body !== undefined && method !== "GET") {
    init.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  const res = await fetch(url, init);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json() : undefined;
  if (!res.ok) {
    const msg = (payload as any)?.message || (payload as any)?.error || `HTTP ${res.status}`;
    throw new ApiError(res.status, msg, payload);
  }
  return (payload ?? ({} as T)) as T;
}

export const api = {
  get: <T = unknown>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...(opts ?? {}), method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...(opts ?? {}), method: "POST", body }),
  patch: <T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...(opts ?? {}), method: "PATCH", body }),
  delete: <T = unknown>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...(opts ?? {}), method: "DELETE" }),
};
