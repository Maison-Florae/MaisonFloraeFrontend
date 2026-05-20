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
    <section className="space-y-14">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
        <div className="space-y-6 rounded-[2.5rem] border border-brand-clay/30 bg-white/80 p-8 shadow-sm sm:p-10">
          <p className="inline-flex rounded-full bg-brand-blush px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest">
            Premium flower delivery from Clichy, Paris
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-none text-brand-ink sm:text-6xl">
            Flowers arranged with warmth, elegance, and a Parisian point of
            view.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-brand-sage sm:text-lg">
            Maison Florae brings together curated bouquets and floral gifts for
            thoughtful moments. Browse the collection, build your basket, and
            submit your order request directly to the atelier.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5"
            >
              Browse the collection
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-5 py-3 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
            >
              View basket
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              title: "Curated bouquets",
              text: "A refined selection designed for gifting, home rituals, and understated celebration.",
            },
            {
              title: "Paris atelier delivery",
              text: "Orders are prepared and coordinated by our pilot atelier in Clichy for the Paris market.",
            },
            {
              title: "Simple order flow",
              text: "You can already browse, add to basket, and submit a live order request while payment integration is pending.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-brand-clay/25 bg-white/75 p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-brand-ink">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-sage">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sage">
              Featured bouquets
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-ink sm:text-4xl">
              Seasonal stems selected from the live catalog
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-brand-forest underline decoration-brand-clay decoration-2 underline-offset-4"
          >
            View all products
          </Link>
        </div>

        {isLoading && (
          <div className="rounded-[2rem] border border-brand-clay/40 bg-white/80 p-6 text-sm text-brand-sage">
            Loading featured products...
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && <ProductsGrid products={products} />}
      </div>
    </section>
  );
}
