// Simple HTTP client for Vite + React
// Uses VITE_API_URL from .env.*

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function buildUrl(path, query) {
  const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path}`);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

async function request(path, { method = 'GET', headers, body, query, timeoutMs = 15000, credentials } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  const opts = {
    method,
    headers: {
      'Accept': 'application/json',
      ...(body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...(headers || {}),
    },
    signal: controller.signal,
    ...(credentials ? { credentials } : {}), // e.g. 'include' if backend uses cookies
    ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(buildUrl(path, query), opts);
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(id);
  }
}

export const http = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default http;
