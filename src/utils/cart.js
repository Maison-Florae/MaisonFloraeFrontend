export function sanitizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      productId: String(item?.productId || ""),
      name: item?.name || "Maison Florae bouquet",
      price: Number(item?.price || 0),
      imageUrl: item?.imageUrl || "",
      quantity: Math.max(1, Number(item?.quantity || 1)),
      inStock: item?.inStock !== false,
    }))
    .filter((item) => item.productId);
}

export function calculateCartTotals(items) {
  return sanitizeCartItems(items).reduce(
    (totals, item) => {
      totals.itemCount += item.quantity;
      totals.subtotal += item.price * item.quantity;

      return totals;
    },
    { itemCount: 0, subtotal: 0 },
  );
}

export function getCartLineTotal(item) {
  return Number(item?.price || 0) * Number(item?.quantity || 0);
}
