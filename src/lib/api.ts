/**
 * API Utility
 *
 * Helper functions untuk fetch data dari backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
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

    throw error;
  }

  return data as TResponse;
}

export { fetchAPI, API_BASE_URL };
