import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export function ProfilePage() {
  const { mode } = useTheme();
  const { user, isAuthed, logout } = useAuth();
  const { items, clear, totalCount, totalPrice } = useCart();

  return (
    <section className="cd-stack">
      <h2 className="cd-h2">Profile</h2>

      <div className="cd-card cd-stack">
        <div className="cd-grid2">
          <div>
            <div className="cd-label">Theme</div>
            <div className="cd-value">
              Current mode: <strong>{mode}</strong>
            </div>
          </div>
          <div>
            <div className="cd-label">User</div>
            <div className="cd-value">
              {isAuthed ? (
                <>
                  <strong>{user.name}</strong>
                </>
              ) : (
                <strong>Not logged in</strong>
              )}
            </div>
          </div>
        </div>

        <div className="cd-divider" />

        <div className="cd-rowBetween">
          <div className="cd-pill">
            Cart: <strong>{totalCount}</strong> items · <strong>₹{totalPrice}</strong>
          </div>
          <div className="cd-row">
            <button className="cd-btn cd-btnGhost" type="button" onClick={clear} disabled={items.length === 0}>
              Clear cart
            </button>
            <button className="cd-btn" type="button" onClick={logout} disabled={!isAuthed}>
              Logout
            </button>
          </div>
        </div>

        {items.length > 0 ? (
          <ul className="cd-list">
            {items.map((it) => (
              <li key={it.id} className="cd-listItem">
                <span className="cd-muted">{it.qty}×</span> {it.name}
                <span className="cd-muted">₹{it.qty * it.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cd-muted">Your cart is empty.</div>
        )}
      </div>
    </section>
  );
}

