/**
 * API Utility
 *
 * Helper functions untuk fetch data dari backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchAPIOptions<TBody = any> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
}

async function fetchAPI<TResponse, TBody = any>(
  endpoint: string,
  options: FetchAPIOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log("responseresponse", response);

    if (!response?.ok) {
      const errorText = await response.text();
      console.log("responseresponse errorText", response, errorText);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

export { fetchAPI, API_BASE_URL };
