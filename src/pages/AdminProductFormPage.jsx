import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminProductForm } from "../components/AdminProductForm";
import {
  createProduct,
  getProductById,
  getProductFormValues,
  updateProduct,
} from "../services/productService";

export function AdminProductFormPage({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = mode === "edit";
  const [formValues, setFormValues] = useState(getProductFormValues());
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setIsLoading(true);
        const product = await getProductById(id);

        if (isMounted) {
          setFormValues(getProductFormValues(product));
          setLoadError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setLoadError(
            requestError.message || "We could not load this product.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (isEditMode && id) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};
    const trimmedName = formValues.name.trim();
    const parsedPrice = Number(formValues.price);

    if (!trimmedName) {
      nextErrors.name = "Name is required.";
    }

    if (formValues.price === "") {
      nextErrors.price = "Price is required.";
    } else if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      nextErrors.price = "Price must be a valid number.";
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
      if (isEditMode) {
        await updateProduct(id, formValues);
      } else {
        await createProduct(formValues);
      }

      navigate("/admin/products", {
        replace: true,
        state: {
          feedback: isEditMode
            ? "Product updated successfully."
            : "Product created successfully.",
        },
      });
    } catch (requestError) {
      setSubmitError(
        requestError.message || "We could not save this product right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-brand-clay/30 bg-white/85 p-6 text-sm text-brand-sage shadow-sm">
        Loading product details...
      </div>
    );
  }

  if (loadError) {
    return (
      <section className="space-y-4 rounded-[2rem] border border-red-200 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
          Product unavailable
        </p>
        <h1 className="text-3xl font-semibold text-brand-ink">
          We could not load this product.
        </h1>
        <p className="text-sm leading-relaxed text-brand-sage">{loadError}</p>
        <Link
          to="/admin/products"
          className="inline-flex items-center justify-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream"
        >
          Back to admin products
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/admin/products"
          className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
        >
          Back to admin products
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full border border-brand-clay/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-petal"
        >
          Open public collection
        </Link>
      </div>

      <AdminProductForm
        formValues={formValues}
        formErrors={formErrors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        submitLabel={isEditMode ? "Save changes" : "Create product"}
        title={
          isEditMode
            ? "Edit an existing Maison Florae product."
            : "Create a new Maison Florae product."
        }
        description={
          isEditMode
            ? "Update the fields below to change how this product appears in the public storefront."
            : "Fill in the fields below to add a new product to the platform using the current backend contract."
        }
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
