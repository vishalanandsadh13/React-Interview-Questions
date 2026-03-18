import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'contextDemo.cart';

function getInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => {
    const add = (product) => {
      setItems((prev) => {
        const found = prev.find((p) => p.id === product.id);
        if (!found) return [...prev, { ...product, qty: 1 }];
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      });
    };

    const dec = (id) => {
      setItems((prev) =>
        prev
          .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
          .filter((p) => p.qty > 0),
      );
    };

    const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
    const clear = () => setItems([]);

    const totalCount = items.reduce((sum, p) => sum + p.qty, 0);
    const totalPrice = items.reduce((sum, p) => sum + p.qty * p.price, 0);

    return { items, add, dec, remove, clear, totalCount, totalPrice };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

