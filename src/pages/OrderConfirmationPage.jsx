import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { formatPrice } from "../utils/price";

function getOrderId(order) {
  return order?._id || order?.id || "";
}

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [isLoading, setIsLoading] = useState(!location.state?.order);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      try {
        setIsLoading(true);
        const data = await getOrderById(orderId);

        if (isMounted) {
          setOrder(data);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.message ||
              "We could not reload the order details right now.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (!order && orderId) {
      loadOrder();
    }

    return () => {
      isMounted = false;
    };
  }, [order, orderId]);

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-brand-clay/30 bg-white/85 p-6 text-sm text-brand-sage shadow-sm">
        Loading your order confirmation...
      </div>
    );
  }

  if (error || !order) {
    return (
      <section className="space-y-4 rounded-[2rem] border border-red-200 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
          Confirmation unavailable
        </p>
        <h1 className="text-3xl font-semibold text-brand-ink">
          We could not reload this order right now.
        </h1>
        <p className="text-sm leading-relaxed text-brand-sage">
          {error ||
            "The order may still exist in the backend, but the confirmation page could not reload it."}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream"
          >
            Return to collection
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-5 py-3 text-sm font-semibold text-brand-forest"
          >
            Visit basket
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <header className="rounded-[2rem] border border-brand-clay/30 bg-white/90 p-8 shadow-sm">
        <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
          Order received
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-brand-ink sm:text-5xl">
          Thank you for choosing Maison Florae.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-sage">
          Your order request has been recorded and passed to the atelier. We
          will review the bouquet details and delivery information from this
          submission flow while payment and advanced checkout features are being
          finalized.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-[2rem] border border-brand-clay/30 bg-white/90 p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sage">
                Order ID
              </p>
              <p className="mt-2 text-base font-semibold text-brand-ink">
                {getOrderId(order)}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sage">
                Delivery address
              </p>
              <p className="mt-2 text-base text-brand-ink">
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sage">
              Items requested
            </p>
            <div className="mt-4 space-y-4">
              {order.items?.map((item) => (
                <div
                  key={`${item.productId}-${item.name}`}
                  className="flex items-center justify-between gap-4 border-b border-brand-clay/15 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-base font-semibold text-brand-ink">
                      {item.name}
                    </p>
                    <p className="text-sm text-brand-sage">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-brand-ink">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-brand-clay/30 bg-white/90 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sage">
            Total submitted
          </p>
          <p className="mt-4 text-3xl font-semibold text-brand-ink">
            {formatPrice(order.totalPrice)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-sage">
            This confirmation reflects order submission only. Live payment,
            timed delivery, and gifting extras will be connected after the next
            backend release.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream"
          >
            Continue browsing
          </Link>
        </aside>
      </div>
    </section>
  );
}
