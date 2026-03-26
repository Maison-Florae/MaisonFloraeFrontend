import { ProductCard } from "./ProductCard";

export function ProductsGrid({ products }) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-clay/40 bg-white/60 p-8 text-center text-sm text-brand-forest/70">
        No products available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
