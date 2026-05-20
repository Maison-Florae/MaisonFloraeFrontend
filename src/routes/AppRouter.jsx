import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage";
import { AdminProductsPage } from "../pages/AdminProductsPage";
import { AdminProductFormPage } from "../pages/AdminProductFormPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/products/new"
            element={<AdminProductFormPage mode="create" />}
          />
          <Route
            path="/admin/products/:id/edit"
            element={<AdminProductFormPage mode="edit" />}
          />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmationPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
