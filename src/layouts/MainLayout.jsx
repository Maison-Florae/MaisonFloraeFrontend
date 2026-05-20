import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export function MainLayout() {
  const { itemCount, recentlyAddedItem, dismissRecentlyAddedItem } = useCart();
  const navLinkClassName = ({ isActive }) =>
    [
      "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
      isActive ? "bg-brand-forest text-brand-cream" : "text-brand-sage hover:bg-brand-petal",
    ].join(" ");

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-brand-cream text-brand-forest">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(231,212,205,0.88),_transparent_58%)]" />

      <header className="sticky top-0 z-20 border-b border-brand-clay/25 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight text-brand-ink">
                Maison Florae
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-brand-sage">
                Floral atelier for Paris
              </p>
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-brand-clay/35 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal lg:hidden"
            >
              Basket
              <span className="rounded-full bg-brand-forest px-2 py-0.5 text-xs text-brand-cream">
                {itemCount}
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex items-center gap-2">
              <NavLink to="/" className={navLinkClassName} end>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClassName}>
                Collection
              </NavLink>
              <NavLink to="/cart" className={navLinkClassName}>
                Basket
              </NavLink>
              <NavLink to="/admin/products" className={navLinkClassName}>
                Admin
              </NavLink>
            </nav>

            <Link
              to="/checkout"
              className="hidden items-center gap-2 rounded-full bg-brand-forest px-4 py-2 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5 lg:inline-flex"
            >
              Checkout
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {itemCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {recentlyAddedItem && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-30 w-[min(24rem,calc(100vw-2rem))]">
          <div className="pointer-events-auto rounded-[1.6rem] border border-emerald-200 bg-white/95 p-4 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Added to basket
                </p>
                <p className="text-sm font-semibold text-brand-ink">
                  {recentlyAddedItem.quantity} x {recentlyAddedItem.name}
                </p>
                <p className="text-sm text-brand-sage">
                  Your basket now reflects the latest selection.
                </p>
              </div>

              <button
                type="button"
                onClick={dismissRecentlyAddedItem}
                className="rounded-full border border-brand-clay/25 px-2.5 py-1 text-xs font-semibold text-brand-sage transition-colors hover:bg-brand-petal"
                aria-label="Dismiss basket notification"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full bg-brand-forest px-4 py-2 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5"
              >
                View basket
              </Link>
              <button
                type="button"
                onClick={dismissRecentlyAddedItem}
                className="inline-flex items-center justify-center rounded-full border border-brand-clay/35 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
              >
                Keep browsing
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-brand-clay/25 bg-white/75">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="text-xl font-semibold text-brand-ink">Maison Florae</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-sage">
              Premium floral ordering for the pilot atelier in Clichy. This
              frontend currently supports live browsing, basket management, and
              basic order submission while payment and expanded delivery options
              are pending backend work.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-brand-sage md:items-end">
            <Link to="/products" className="transition-colors hover:text-brand-forest">
              Browse the collection
            </Link>
            <Link to="/cart" className="transition-colors hover:text-brand-forest">
              Review your basket
            </Link>
            <Link
              to="/admin/products"
              className="transition-colors hover:text-brand-forest"
            >
              Manage products
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
