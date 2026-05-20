export function getProductId(product) {
  return product?.id || product?._id || "";
}

export function getCategoryLabel(category) {
  if (!category) {
    return "Signature collection";
  }

  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizeProduct(product = {}) {
  return {
    ...product,
    id: getProductId(product),
    price: Number(product.price || 0),
    description: product.description || "",
    imageUrl: product.imageUrl || "",
    category: product.category || "signature-collection",
    inStock: product.inStock !== false,
  };
}

export function mapProductToCartItem(product, quantity = 1) {
  const normalizedProduct = normalizeProduct(product);

  return {
    productId: normalizedProduct.id,
    name: normalizedProduct.name,
    price: normalizedProduct.price,
    imageUrl: normalizedProduct.imageUrl,
    quantity: Math.max(1, Number(quantity || 1)),
    inStock: normalizedProduct.inStock,
  };
}
