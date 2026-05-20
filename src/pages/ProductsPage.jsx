import { useEffect, useState } from "react";
import { ProductsGrid } from "../components/ProductsGrid";
import { getProducts } from "../services/productService";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Failed to load products.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
          Curated collection
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
          Flowers and gifting moments for the Paris atelier pilot.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-brand-sage">
          Browse the live Maison Florae catalog, discover seasonal bouquets, and
          add your favorites to a basket before submitting a simple order
          request.
        </p>
      </header>

      {isLoading && (
        <div className="rounded-[2rem] border border-brand-clay/40 bg-white/80 p-6 text-sm text-brand-sage">
          Loading products...
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && <ProductsGrid products={products} />}
    </section>
  );
}
