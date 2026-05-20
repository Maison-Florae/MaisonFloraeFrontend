import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productService";
import { formatPrice } from "../utils/price";
import { getCategoryLabel } from "../utils/product";

export function AdminProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmingProductId, setConfirmingProductId] = useState("");
  const [isDeletingId, setIsDeletingId] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Failed to load products.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (location.state?.feedback) {
      setFeedback(location.state.feedback);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const productCountLabel = useMemo(() => {
    if (isLoading) {
      return "Loading products";
    }

    if (!products.length) {
      return "No products yet";
    }

    return `${products.length} product${products.length === 1 ? "" : "s"}`;
  }, [isLoading, products.length]);

  async function handleDelete(productId) {
    try {
      setIsDeletingId(productId);
      setError("");
      setFeedback("");

      await deleteProduct(productId);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId),
      );
      setConfirmingProductId("");
      setFeedback("Product deleted successfully.");
    } catch (requestError) {
      setError(requestError.message || "Failed to delete product.");
    } finally {
      setIsDeletingId("");
    }
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="inline-flex rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest">
            Product admin
          </p>
          <h1 className="text-4xl font-semibold text-brand-ink sm:text-5xl">
            Manage products for the Maison Florae storefront.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-brand-sage">
            This admin area connects directly to the current backend product
            CRUD endpoints so you can manage the storefront catalog from the
            deployed frontend.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="rounded-full border border-brand-clay/30 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-sage">
            {productCountLabel}
          </span>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5"
          >
            Create product
          </Link>
        </div>
      </header>

      {feedback && (
        <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {feedback}
        </div>
      )}

      {error && (
        <div className="rounded-[1.6rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="rounded-[2rem] border border-brand-clay/30 bg-white/85 p-6 text-sm text-brand-sage shadow-sm">
          Loading products...
        </div>
      )}

      {!isLoading && !products.length && !error && (
        <div className="rounded-[2rem] border border-dashed border-brand-clay/40 bg-white/80 p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sage">
            No products yet
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-sage">
            Create the first product to make it available through both the
            admin area and the public storefront.
          </p>
          <Link
            to="/admin/products/new"
            className="mt-6 inline-flex rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream"
          >
            Add the first product
          </Link>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="overflow-hidden rounded-[2rem] border border-brand-clay/25 bg-white/90 shadow-sm">
          <div className="grid grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)_auto] gap-4 border-b border-brand-clay/20 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-sage">
            <span>Product</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-brand-clay/15">
            {products.map((product) => {
              const isConfirmingDelete = confirmingProductId === product.id;
              const isDeleting = isDeletingId === product.id;

              return (
                <article
                  key={product.id}
                  className="grid gap-4 px-5 py-5 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)_auto] lg:items-center"
                >
                  <div className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1.4rem] bg-brand-petal">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-3 text-center text-xs text-brand-sage">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold text-brand-ink">
                        {product.name}
                      </h2>
                      <p className="text-sm text-brand-sage">
                        {getCategoryLabel(product.category)} - {formatPrice(product.price)}
                      </p>
                      <p className="max-w-2xl text-sm leading-relaxed text-brand-sage">
                        {product.description || "No description added yet."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em]">
                    <span
                      className={[
                        "rounded-full px-3 py-1 font-semibold",
                        product.inStock
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900",
                      ].join(" ")}
                    >
                      {product.inStock ? "In stock" : "Out of stock"}
                    </span>
                    <span className="rounded-full bg-brand-petal px-3 py-1 font-semibold text-brand-sage">
                      {product.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
                    >
                      Edit
                    </Link>

                    {!isConfirmingDelete ? (
                      <button
                        type="button"
                        onClick={() => setConfirmingProductId(product.id)}
                        className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                      >
                        Delete
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting}
                          className="inline-flex items-center justify-center rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isDeleting ? "Deleting..." : "Confirm delete"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingProductId("")}
                          disabled={isDeleting}
                          className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
