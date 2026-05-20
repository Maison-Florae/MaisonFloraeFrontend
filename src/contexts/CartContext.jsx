import { createContext, useContext, useEffect, useState } from "react";
import { calculateCartTotals, sanitizeCartItems } from "../utils/cart";
import { mapProductToCartItem } from "../utils/product";

const CART_STORAGE_KEY = "maison-florae-cart";

const CartContext = createContext(null);

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    return sanitizeCartItems(JSON.parse(storedCart));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [recentlyAddedItem, setRecentlyAddedItem] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!recentlyAddedItem) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setRecentlyAddedItem(null);
    }, 2400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [recentlyAddedItem]);

  function addItem(product, quantity = 1) {
    const nextItem = mapProductToCartItem(product, quantity);

    setRecentlyAddedItem({
      name: nextItem.name,
      quantity: nextItem.quantity,
      productId: nextItem.productId,
      timestamp: Date.now(),
    });

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === nextItem.productId,
      );

      if (!existingItem) {
        return [...currentItems, nextItem];
      }

      return currentItems.map((item) =>
        item.productId === nextItem.productId
          ? {
              ...item,
              quantity: item.quantity + nextItem.quantity,
              inStock: nextItem.inStock,
            }
          : item,
      );
    });
  }

  function incrementItem(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decrementItem(productId) {
    setCartItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.productId !== productId) {
          return item;
        }

        if (item.quantity <= 1) {
          return [];
        }

        return { ...item, quantity: item.quantity - 1 };
      }),
    );
  }

  function removeItem(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function dismissRecentlyAddedItem() {
    setRecentlyAddedItem(null);
  }

  function getItemQuantity(productId) {
    return (
      cartItems.find((item) => item.productId === productId)?.quantity || 0
    );
  }

  const { itemCount, subtotal } = calculateCartTotals(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        getItemQuantity,
        recentlyAddedItem,
        dismissRecentlyAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
