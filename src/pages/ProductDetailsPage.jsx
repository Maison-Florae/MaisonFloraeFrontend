import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { QuantitySelector } from "../components/QuantitySelector";
import { formatPrice } from "../utils/price";
import { getCategoryLabel } from "../utils/product";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { addItem, getItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isRecentlyAdded, setIsRecentlyAdded] = useState(false);

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

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  useEffect(() => {
    if (!isRecentlyAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsRecentlyAdded(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isRecentlyAdded]);

  function handleAddToBasket() {
    addItem(product, quantity);
    setIsRecentlyAdded(true);
  }

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-brand-clay/40 bg-white/80 p-6 text-sm text-brand-sage">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error || "Product not found."}
        </div>
        <Link
          to="/products"
          className="text-sm font-medium text-brand-forest underline decoration-brand-clay decoration-2 underline-offset-4"
        >
          Back to collection
        </Link>
      </div>
    );
  }

  return (
    <article className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] xl:items-start">
      <div className="overflow-hidden rounded-[2rem] border border-brand-clay/35 bg-white/85 shadow-sm">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex min-h-[320px] items-center justify-center bg-brand-petal text-sm font-medium text-brand-sage">
            Image coming soon
          </div>
        )}
      </div>

      <div className="space-y-6 rounded-[2rem] border border-brand-clay/30 bg-white/90 p-7 shadow-sm">
        <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-forest">
          {getCategoryLabel(product.category)}
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-brand-forest">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="text-base leading-relaxed text-brand-sage">
          {product.description || "No description available."}
        </p>

        <p
          className={[
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
            product.inStock ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900",
          ].join(" ")}
        >
          {product.inStock ? "Available for order" : "Currently unavailable"}
        </p>

        <div className="space-y-4 rounded-[1.8rem] border border-brand-clay/25 bg-brand-cream/80 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sage">
                Quantity
              </p>
              <p className="mt-1 text-sm text-brand-sage">
                Already in basket: {getItemQuantity(product.id)}
              </p>
            </div>
            <QuantitySelector
              value={quantity}
              onDecrease={() => setQuantity((currentValue) => Math.max(1, currentValue - 1))}
              onIncrease={() => setQuantity((currentValue) => currentValue + 1)}
              disabled={!product.inStock}
            />
          </div>

          <button
            type="button"
            onClick={handleAddToBasket}
            disabled={!product.inStock}
            className={[
              "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-brand-cream transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-brand-sage/45",
              isRecentlyAdded ? "bg-emerald-700" : "bg-brand-forest",
            ].join(" ")}
          >
            {product.inStock
              ? isRecentlyAdded
                ? "Added to basket"
                : "Add to basket"
              : "Unavailable for order"}
          </button>

          {product.inStock && isRecentlyAdded && (
            <p className="text-sm font-medium text-emerald-800">
              {quantity} {quantity === 1 ? "item has" : "items have"} been
              added to your basket.
            </p>
          )}
        </div>

        <div className="rounded-[1.8rem] border border-brand-clay/20 bg-white/70 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sage">
            What to expect
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-brand-sage">
            <li>Submit your basket as an order request directly from checkout.</li>
            <li>Delivery preferences and live payment are part of the next backend milestone.</li>
            <li>The atelier pilot is based in Clichy and serves the Paris market.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-forest transition-colors hover:bg-brand-petal"
          >
            Back to collection
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-forest transition-colors hover:bg-brand-petal"
          >
            View basket
          </Link>
        </div>
      </div>
    </article>
  );
}
