import { API_BASE_URL, getJson } from "./api";
import { roundPrice } from "../utils/price";

const ORDERS_API_URL = `${API_BASE_URL}/api/orders`;

export function buildOrderPayload({
  cartItems,
  customerName,
  customerEmail,
  deliveryAddress,
  totalPrice,
}) {
  return {
    customerName: customerName.trim(),
    customerEmail: customerEmail.trim(),
    deliveryAddress: deliveryAddress.trim(),
    items: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
      imageUrl: item.imageUrl || "",
    })),
    totalPrice: roundPrice(totalPrice),
    status: "pending",
  };
}

export function createOrder(payload) {
  return getJson(ORDERS_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getOrderById(id) {
  return getJson(`${ORDERS_API_URL}/${id}`);
}
