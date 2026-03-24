import 'server-only';
import type { ApiResponse } from './types';

function getBaseHeaders(cartToken?: string | null): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': process.env.SWAG_API_TOKEN ?? '',
    };
    if (cartToken) {
        headers['x-cart-token'] = cartToken;
    }
    return headers;
}

function getBaseUrl() {
    const baseUrl = process.env.SWAG_API_BASE_URL;
    if (!baseUrl) {
        throw new Error('SWAG_API_BASE_URL environment variable is not set');
    }
    return baseUrl;
}

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as ApiResponse<T>;
  if (!json.success) {
    throw new Error("API returned success: false");
  }
  return json;
}

export async function apiGet<T>(
  path: string,
  searchParams?: Record<string, string>,
  options?: { cartToken?: string }
): Promise<ApiResponse<T>> {
  const url = new URL(`${getBaseUrl()}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }
  const res = await fetch(url.toString(), {
    headers: getBaseHeaders(options?.cartToken),
  });
  return parseResponse<T>(res);
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  options?: { cartToken?: string }
): Promise<ApiResponse<T>> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "POST",
    headers: getBaseHeaders(options?.cartToken),
    body: JSON.stringify(body),
  });
  return parseResponse<T>(res);
}

export async function apiDelete<T>(
  path: string,
  options?: { cartToken?: string }
): Promise<ApiResponse<T>> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "DELETE",
    headers: getBaseHeaders(options?.cartToken),
  });
  return parseResponse<T>(res);
}

export async function apiPatch<T>(
  path: string,
  body: unknown,
  options?: { cartToken?: string }
): Promise<ApiResponse<T>> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "PATCH",
    headers: getBaseHeaders(options?.cartToken),
    body: JSON.stringify(body),
  });
  return parseResponse<T>(res);
}