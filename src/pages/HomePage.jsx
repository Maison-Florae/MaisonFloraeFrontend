import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductsGrid } from "../components/ProductsGrid";
import { getProducts } from "../services/productService";

export function HomePage() {
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
          setProducts(data.slice(0, 6));
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Failed to load featured products.");
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
    <section className="space-y-10">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="inline-block rounded-full bg-brand-clay/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
            Maison Florae
          </p>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">Floral-inspired home and decor collection</h2>
          <p className="max-w-xl text-base leading-relaxed text-brand-forest/80">
            Discover curated pieces inspired by natural textures, warm tones, and timeless botanical forms.
          </p>
          <Link
            to="/products"
            className="inline-flex rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream transition-opacity hover:opacity-90"
          >
            Browse all products
          </Link>
        </div>

        <div className="rounded-2xl border border-brand-clay/40 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">What is live now</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-brand-forest/80">
            <li>Product listing page connected to the backend API.</li>
            <li>Single product route with dynamic details by id.</li>
            <li>Homepage showcase powered by the same product endpoint.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold">Featured products</h3>
          <Link to="/products" className="text-sm font-medium text-brand-forest underline">
            View full catalog
          </Link>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-brand-clay/40 bg-white p-6 text-sm text-brand-forest/80">
            Loading featured products...
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
        )}

        {!isLoading && !error && <ProductsGrid products={products} />}
      </div>
    </section>
  );
}
