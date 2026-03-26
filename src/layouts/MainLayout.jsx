import { Link, NavLink, Outlet } from "react-router-dom";

export function MainLayout() {
  const navLinkClassName = ({ isActive }) =>
    [
      "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
      isActive ? "bg-brand-forest text-brand-cream" : "text-brand-forest/80 hover:bg-brand-clay/20",
    ].join(" ");

  return (
    <div className="min-h-screen bg-brand-cream text-brand-forest">
      <header className="border-b border-brand-clay/40 bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            Maison Florae
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClassName} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClassName}>
              Products
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-brand-clay/40 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-sm text-brand-forest/80">
          Maison Florae Frontend
        </div>
      </footer>
    </div>
  );
}
