import { normalizeProduct } from "../utils/product";
import { API_BASE_URL, getJson } from "./api";

const PRODUCTS_API_URL = `${API_BASE_URL}/api/products`;

export async function getProducts() {
  const data = await getJson(PRODUCTS_API_URL);
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
}

export async function getProductById(id) {
  const data = await getJson(`${PRODUCTS_API_URL}/${id}`);
  return normalizeProduct(data);
}
