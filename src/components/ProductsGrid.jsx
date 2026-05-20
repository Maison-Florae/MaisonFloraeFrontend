import { ProductCard } from "./ProductCard";
import { getProductId } from "../utils/product";

export function ProductsGrid({ products }) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-brand-clay/40 bg-white/70 p-8 text-center text-sm text-brand-sage">
        No flowers are available just yet. Please check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={getProductId(product)} product={product} />
      ))}
    </div>
  );
}
