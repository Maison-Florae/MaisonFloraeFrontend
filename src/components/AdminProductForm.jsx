export function AdminProductForm({
  formValues,
  formErrors,
  submitError,
  isSubmitting,
  submitLabel,
  title,
  description,
  onChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[2rem] border border-brand-clay/30 bg-white/90 p-6 shadow-sm"
    >
      <div className="space-y-3">
        <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
          Internal product management
        </p>
        <h1 className="text-4xl font-semibold text-brand-ink sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-brand-sage">
          {description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-brand-ink">Name</span>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={onChange}
            className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
            placeholder="Signature Rose Bouquet"
          />
          {formErrors.name && (
            <p className="mt-2 text-sm text-red-700">{formErrors.name}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-brand-ink">Category</span>
          <input
            type="text"
            name="category"
            value={formValues.category}
            onChange={onChange}
            className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
            placeholder="bouquets"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-brand-ink">
          Description
        </span>
        <textarea
          rows={5}
          name="description"
          value={formValues.description}
          onChange={onChange}
          className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
          placeholder="Describe the bouquet, style, or gifting intent."
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-brand-ink">Price</span>
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={formValues.price}
            onChange={onChange}
            className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
            placeholder="68"
          />
          {formErrors.price && (
            <p className="mt-2 text-sm text-red-700">{formErrors.price}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-brand-ink">
            Image URL
          </span>
          <input
            type="url"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={onChange}
            className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="flex items-center gap-3 rounded-[1.4rem] border border-brand-clay/20 bg-brand-cream/70 px-4 py-3">
        <input
          type="checkbox"
          name="inStock"
          checked={formValues.inStock}
          onChange={onChange}
          className="h-4 w-4 rounded border-brand-clay/40 text-brand-forest focus:ring-brand-forest"
        />
        <span className="text-sm font-semibold text-brand-ink">
          Product available for purchase
        </span>
      </label>

      {submitError && (
        <div className="rounded-[1.5rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Saving product..." : submitLabel}
      </button>
    </form>
  );
}
