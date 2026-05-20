import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { buildOrderPayload, createOrder } from "../services/orderService";
import { formatPrice } from "../utils/price";
import { getCartLineTotal } from "../utils/cart";

const initialFormData = {
  customerName: "",
  customerEmail: "",
  deliveryAddress: "",
  customerPhone: "",
  deliveryTimeSlot: "",
  messageCardText: "",
  deliveryInstructions: "",
};

function PendingField({ label, placeholder, as = "input" }) {
  const sharedClassName =
    "mt-2 w-full rounded-[1.4rem] border border-brand-clay/25 bg-brand-mist px-4 py-3 text-sm text-brand-sage outline-none";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-brand-ink">{label}</span>
      <span className="ml-2 rounded-full bg-brand-petal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sage">
        Available after backend update
      </span>
      {as === "textarea" ? (
        <textarea
          disabled
          rows={4}
          placeholder={placeholder}
          className={sharedClassName}
        />
      ) : (
        <input disabled placeholder={placeholder} className={sharedClassName} />
      )}
    </label>
  );
}

export function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cartItems.length) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentState) => ({
      ...currentState,
      [name]: value,
    }));

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.customerName.trim()) {
      nextErrors.customerName = "Full name is required.";
    }

    if (!formData.customerEmail.trim()) {
      nextErrors.customerEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      nextErrors.customerEmail = "Enter a valid email address.";
    }

    if (!formData.deliveryAddress.trim()) {
      nextErrors.deliveryAddress = "Delivery address is required.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = buildOrderPayload({
        cartItems,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        deliveryAddress: formData.deliveryAddress,
        totalPrice: subtotal,
      });

      const createdOrder = await createOrder(payload);
      const orderId = createdOrder?._id || createdOrder?.id;

      if (!orderId) {
        throw new Error(
          "The order was submitted, but the confirmation details were incomplete.",
        );
      }

      clearCart();
      navigate(`/order-confirmation/${orderId}`, {
        replace: true,
        state: { order: createdOrder },
      });
    } catch (error) {
      setSubmitError(
        error.message ||
          "We could not submit your order right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
          Checkout
        </p>
        <h1 className="text-4xl font-semibold text-brand-ink sm:text-5xl">
          Place a simple order request for the atelier.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-brand-sage">
          This stage submits your order details to the current backend. Live
          payment and expanded delivery options will be connected in the next
          backend milestone.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[2rem] border border-brand-clay/30 bg-white/90 p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-brand-ink">
                  Full name
                </span>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
                  placeholder="Joan Jimenez Camps"
                />
                {formErrors.customerName && (
                  <p className="mt-2 text-sm text-red-700">
                    {formErrors.customerName}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-brand-ink">
                  Email
                </span>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
                  placeholder="joan@example.com"
                />
                {formErrors.customerEmail && (
                  <p className="mt-2 text-sm text-red-700">
                    {formErrors.customerEmail}
                  </p>
                )}
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-brand-ink">
                Delivery address
              </span>
              <textarea
                rows={4}
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className="mt-2 w-full rounded-[1.4rem] border border-brand-clay/30 bg-brand-cream px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-forest"
                placeholder="Street, building, floor, and any necessary access details"
              />
              {formErrors.deliveryAddress && (
                <p className="mt-2 text-sm text-red-700">
                  {formErrors.deliveryAddress}
                </p>
              )}
            </label>
          </div>

          <div className="space-y-4 rounded-[1.8rem] border border-brand-clay/25 bg-brand-cream/70 p-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sage">
                Backend pending fields
              </p>
              <p className="text-sm leading-relaxed text-brand-sage">
                These fields are part of the next backend milestone. They are
                shown here so the customer journey stays aligned with the final
                Maison Florae checkout experience.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <PendingField
                label="Phone"
                placeholder="Available after backend update"
              />
              <PendingField
                label="Delivery time slot"
                placeholder="Available after backend update"
              />
            </div>

            <PendingField
              label="Message card text"
              placeholder="Available after backend update"
              as="textarea"
            />
            <PendingField
              label="Delivery instructions"
              placeholder="Available after backend update"
              as="textarea"
            />
          </div>

          {submitError && (
            <div className="rounded-[1.5rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting order..." : "Place order"}
            </button>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-5 py-3 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
            >
              Return to basket
            </Link>
          </div>
        </form>

        <aside className="h-fit rounded-[2rem] border border-brand-clay/30 bg-white/90 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sage">
            Order summary
          </p>
          <div className="mt-5 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-start justify-between gap-4 border-b border-brand-clay/15 pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-brand-ink">
                    {item.name}
                  </p>
                  <p className="text-sm text-brand-sage">
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-ink">
                  {formatPrice(getCartLineTotal(item))}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-base text-brand-sage">Subtotal</span>
            <span className="text-xl font-semibold text-brand-ink">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-brand-sage">
            Delivery fees and payment confirmation remain intentionally out of
            scope until the backend checkout upgrades are in place.
          </p>
        </aside>
      </div>
    </section>
  );
}
