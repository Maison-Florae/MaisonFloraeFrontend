export function formatPrice(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function roundPrice(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}
