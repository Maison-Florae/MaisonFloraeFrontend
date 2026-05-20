import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/price";
import { getCategoryLabel } from "../utils/product";

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, name, description, price, imageUrl, category, inStock } = product;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-brand-clay/35 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-brand-petal">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-brand-sage">
            Image coming soon
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em]">
          <span className="rounded-full bg-white/85 px-3 py-1 font-semibold text-brand-forest shadow-sm">
            {getCategoryLabel(category)}
          </span>
          <span
            className={[
              "rounded-full px-3 py-1 font-semibold shadow-sm",
              inStock ? "bg-emerald-100/90 text-emerald-800" : "bg-amber-100/95 text-amber-900",
            ].join(" ")}
          >
            {inStock ? "Available" : "Sold out"}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-2xl font-semibold text-brand-ink">{name}</h3>
          <p className="text-base font-semibold text-brand-forest">{formatPrice(price)}</p>
        </div>

        <p className="text-sm leading-relaxed text-brand-sage">
          {description || "A curated Maison Florae bouquet, prepared with care."}
        </p>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            to={`/products/${id}`}
            className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-forest transition-colors hover:bg-brand-petal"
          >
            View details
          </Link>
          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={!inStock}
            className="inline-flex items-center justify-center rounded-full bg-brand-forest px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-cream transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-brand-sage/45"
          >
            {inStock ? "Add to basket" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
