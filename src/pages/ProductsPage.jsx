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
        <p className="inline-block rounded-full bg-brand-clay/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
          Product Catalog
        </p>
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">All products</h2>
        <p className="max-w-2xl text-sm text-brand-forest/80">
          Browse the products currently served by the Maison Florae API.
        </p>
      </header>

      {isLoading && (
        <div className="rounded-2xl border border-brand-clay/40 bg-white p-6 text-sm text-brand-forest/80">
          Loading products...
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
      )}

      {!isLoading && !error && <ProductsGrid products={products} />}
    </section>
  );
}
