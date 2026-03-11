export function HomePage() {
  return (
    <section className="grid gap-6 md:grid-cols-2 md:items-center">
      <div className="space-y-4">
        <p className="inline-block rounded-full bg-brand-clay/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
          Maison Florae
        </p>
        <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">Placeholder Homepage</h2>
        <p className="max-w-xl text-base leading-relaxed text-brand-forest/80">
          React Router and Tailwind are now configured. This page confirms the frontend skeleton is running on Vite and ready for component development.
        </p>
      </div>

      <div className="rounded-2xl border border-brand-clay/40 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Next Steps</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-brand-forest/80">
          <li>Create reusable UI components in src/components.</li>
          <li>Add route modules under src/routes.</li>
          <li>Connect data services in src/services.</li>
        </ul>
      </div>
    </section>
  );
}
