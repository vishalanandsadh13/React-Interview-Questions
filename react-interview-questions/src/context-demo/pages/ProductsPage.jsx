import React from 'react';
import { PRODUCTS } from '../data/products.js';
import { useCart } from '../contexts/CartContext.jsx';

export function ProductsPage() {
  const { items, add, dec, remove, totalCount, totalPrice } = useCart();

  return (
    <section className="cd-stack">
      <div className="cd-rowBetween">
        <h2 className="cd-h2">Products</h2>
        <div className="cd-pill">
          Cart: <strong>{totalCount}</strong> items · <strong>₹{totalPrice}</strong>
        </div>
      </div>

      <div className="cd-gridCards">
        {PRODUCTS.map((p) => {
          const inCart = items.find((it) => it.id === p.id);
          const qty = inCart?.qty ?? 0;

          return (
            <div className="cd-card cd-stack" key={p.id}>
              <div className="cd-rowBetween">
                <div>
                  <div className="cd-title">{p.name}</div>
                  <div className="cd-muted">₹{p.price}</div>
                </div>
                <button className="cd-btn" type="button" onClick={() => add(p)}>
                  Add
                </button>
              </div>

              <div className="cd-rowBetween">
                <div className="cd-pill">
                  Qty: <strong>{qty}</strong>
                </div>
                <div className="cd-row">
                  <button
                    className="cd-btn cd-btnGhost"
                    type="button"
                    onClick={() => dec(p.id)}
                    disabled={qty === 0}
                  >
                    −
                  </button>
                  <button
                    className="cd-btn cd-btnGhost"
                    type="button"
                    onClick={() => add(p)}
                    disabled={qty === 0}
                  >
                    +
                  </button>
                  <button
                    className="cd-btn cd-btnDanger"
                    type="button"
                    onClick={() => remove(p.id)}
                    disabled={qty === 0}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

