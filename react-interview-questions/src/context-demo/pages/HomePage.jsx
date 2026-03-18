import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export function HomePage() {
  const { mode, isDark } = useTheme();
  const { isAuthed, user } = useAuth();
  const { totalCount, totalPrice } = useCart();

  return (
    <section className="cd-stack">
      <h2 className="cd-h2">Context API across the whole app</h2>

      <div className="cd-card cd-stack">
        <div className="cd-grid2">
          <div>
            <div className="cd-label">Theme context</div>
            <div className="cd-value">
              Mode: <strong>{mode}</strong> {isDark ? '(dark palette)' : '(light palette)'}
            </div>
          </div>
          <div>
            <div className="cd-label">Auth context</div>
            <div className="cd-value">
              Status: <strong>{isAuthed ? `Logged in as ${user.name}` : 'Logged out'}</strong>
            </div>
          </div>
        </div>

        <div className="cd-divider" />

        <div className="cd-grid2">
          <div>
            <div className="cd-label">Cart context</div>
            <div className="cd-value">
              Items: <strong>{totalCount}</strong>
            </div>
          </div>
          <div>
            <div className="cd-label">Cart total</div>
            <div className="cd-value">
              Price: <strong>₹{totalPrice}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="cd-muted">
        Open <strong>Products</strong> to add items, then check <strong>Profile</strong> to see how the same
        contexts are used there too.
      </div>
    </section>
  );
}

