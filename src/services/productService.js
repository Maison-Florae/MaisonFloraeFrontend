const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
const PRODUCTS_API_URL = `${API_BASE_URL}/api/products`;

async function parseError(response) {
  try {
    const payload = await response.json();
    return payload?.message || "Request failed";
  } catch {
    return "Request failed";
  }
}

export async function getProducts() {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}
