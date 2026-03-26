import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Number(price || 0));
}

export function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setIsLoading(true);
        const data = await getProductById(id);

        if (isMounted) {
          setProduct(data);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Failed to load product.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-brand-clay/40 bg-white p-6 text-sm text-brand-forest/80">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error || "Product not found."}
        </div>
        <Link to="/products" className="text-sm font-medium text-brand-forest underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <article className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="overflow-hidden rounded-2xl border border-brand-clay/40 bg-white">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex min-h-[320px] items-center justify-center bg-brand-clay/10 text-sm font-medium text-brand-forest/60">
            Image not available
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="inline-block rounded-full bg-brand-clay/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
          {product.category || "general"}
        </p>
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{product.name}</h2>
        <p className="text-2xl font-semibold text-brand-forest">{formatPrice(product.price)}</p>
        <p className="text-sm leading-relaxed text-brand-forest/80">
          {product.description || "No description available."}
        </p>

        <p
          className={[
            "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
            product.inStock ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900",
          ].join(" ")}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </p>

        <div>
          <Link
            to="/products"
            className="inline-flex rounded-full border border-brand-forest/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-forest transition-colors hover:bg-brand-forest hover:text-brand-cream"
          >
            Back to products
          </Link>
        </div>
      </div>
    </article>
  );
}
