import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-forest">
      <header className="border-b border-brand-clay/40 bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">Maison Florae</h1>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-forest/70">Placeholder Build</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-brand-clay/40 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-sm text-brand-forest/80">
          Maison Florae Frontend Skeleton
        </div>
      </footer>
    </div>
  );
}
