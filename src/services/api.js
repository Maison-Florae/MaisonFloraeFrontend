const DEFAULT_API_BASE_URL = "http://localhost:5005";

export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL;

export async function parseError(response) {
  try {
    const payload = await response.json();
    return payload?.message || "Request failed";
  } catch {
    return "Request failed";
  }
}

export async function getJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}
