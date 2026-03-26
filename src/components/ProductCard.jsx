import { Link } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Number(price || 0));
}

export function ProductCard({ product }) {
  const {
    _id,
    name,
    description,
    price,
    imageUrl,
    category,
    inStock,
  } = product;

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-clay/35 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] bg-brand-clay/10">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-brand-forest/60">
            Image not available
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-base font-semibold text-brand-forest">{formatPrice(price)}</p>
        </div>

        <p className="text-sm text-brand-forest/75">{description || "No description available."}</p>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em]">
            <span className="rounded-full bg-brand-clay/20 px-2.5 py-1 font-medium text-brand-forest/80">
              {category || "general"}
            </span>
            <span
              className={[
                "rounded-full px-2.5 py-1 font-medium",
                inStock ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900",
              ].join(" ")}
            >
              {inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <Link
            to={`/products/${_id}`}
            className="rounded-full bg-brand-forest px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream transition-opacity hover:opacity-90"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
