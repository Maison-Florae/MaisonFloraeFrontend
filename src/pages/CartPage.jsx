import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { QuantitySelector } from "../components/QuantitySelector";
import { getCartLineTotal } from "../utils/cart";
import { formatPrice } from "../utils/price";

export function CartPage() {
  const {
    cartItems,
    subtotal,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  if (!cartItems.length) {
    return (
      <section className="space-y-8">
        <header className="space-y-3">
          <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
            Your basket
          </p>
          <h1 className="text-4xl font-semibold text-brand-ink sm:text-5xl">
            Your cart is waiting for its first bouquet.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-brand-sage">
            Browse the collection and add a few stems, seasonal bouquets, or
            gifting moments to get started.
          </p>
        </header>

        <div className="rounded-[2rem] border border-dashed border-brand-clay/40 bg-white/75 p-10 text-center shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-sage">
            No items added yet
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-sage">
            Once you add products to your basket, they will stay here while you
            continue browsing.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5"
          >
            Explore the collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
            Your basket
          </p>
          <h1 className="text-4xl font-semibold text-brand-ink sm:text-5xl">
            A thoughtful order is taking shape.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-brand-sage">
            Review your flowers, adjust quantities, and continue to a simple
            order request checkout for our Paris atelier.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex self-start rounded-full border border-brand-clay/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
        >
          Clear basket
        </button>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={item.productId}
              className="grid gap-4 rounded-[2rem] border border-brand-clay/30 bg-white/85 p-5 shadow-sm sm:grid-cols-[8rem_minmax(0,1fr)]"
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-brand-petal">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full min-h-32 items-center justify-center text-sm text-brand-sage">
                    Image coming soon
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-brand-ink">
                    {item.name}
                  </h2>
                  <p className="text-sm text-brand-sage">
                    Unit price {formatPrice(item.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-sm font-semibold text-brand-forest underline decoration-brand-clay decoration-2 underline-offset-4"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:items-end">
                  <QuantitySelector
                    value={item.quantity}
                    onDecrease={() => decrementItem(item.productId)}
                    onIncrease={() => incrementItem(item.productId)}
                    compact
                  />
                  <p className="text-lg font-semibold text-brand-ink">
                    {formatPrice(getCartLineTotal(item))}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-[2rem] border border-brand-clay/30 bg-white/90 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sage">
            Basket summary
          </p>
          <div className="mt-5 flex items-center justify-between text-base text-brand-sage">
            <span>Subtotal</span>
            <span className="text-xl font-semibold text-brand-ink">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-brand-sage">
            Delivery fee, timed delivery options, and gifting extras will be
            connected once the backend checkout updates are ready.
          </p>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5"
          >
            Continue to checkout
          </Link>
          <Link
            to="/products"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-brand-clay/45 px-5 py-3 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
          >
            Keep browsing
          </Link>
        </aside>
      </div>
    </section>
  );
}
