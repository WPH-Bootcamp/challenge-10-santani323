/**
 * API Utility
 *
 * Helper functions untuk fetch data dari backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchAPIOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
}

async function fetchAPI<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetchAPIOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers } = options;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? (body as any) : JSON.stringify(body)) : undefined,
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = null;
  } 

  if (!response.ok) {
    const error = {
      statusCode: response.status,
      message: data?.message || "Something went wrong",
      error: data?.error || "API Error",
      details: data?.details,
      path: endpoint,
    };

    return error as TResponse;
  }

  return data as TResponse;
}

export { fetchAPI, API_BASE_URL };
