export function QuantitySelector({
  value,
  onDecrease,
  onIncrease,
  min = 1,
  disabled = false,
  compact = false,
}) {
  const buttonClassName = compact
    ? "h-9 w-9"
    : "h-11 w-11";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-clay/35 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || value <= min}
        className={`${buttonClassName} rounded-full text-lg font-semibold text-brand-forest transition-colors hover:bg-brand-petal disabled:cursor-not-allowed disabled:text-brand-sage/40`}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-brand-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        className={`${buttonClassName} rounded-full text-lg font-semibold text-brand-forest transition-colors hover:bg-brand-petal disabled:cursor-not-allowed disabled:text-brand-sage/40`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
