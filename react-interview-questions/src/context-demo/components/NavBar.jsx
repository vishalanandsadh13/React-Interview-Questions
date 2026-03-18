import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function NavBar() {
  const { mode, toggle } = useTheme();
  const { user, isAuthed, login, logout } = useAuth();
  const { totalCount, totalPrice, clear } = useCart();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const cartLabel = useMemo(() => {
    if (totalCount === 0) return 'Cart (0)';
    return `Cart (${totalCount}) - ₹${totalPrice}`;
  }, [totalCount, totalPrice]);

  return (
    <header className="cd-header">
      <div className="cd-container cd-headerRow">
        <div className="cd-brand">
          <Link to="/" className="cd-brandLink">
            Context Demo
          </Link>
          <span className="cd-badge">{mode.toUpperCase()}</span>
        </div>

        <nav className="cd-nav">
          <NavLink to="/" className={({ isActive }) => cx('cd-navLink', isActive && 'isActive')} end>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => cx('cd-navLink', isActive && 'isActive')}
          >
            Products
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => cx('cd-navLink', isActive && 'isActive')}
          >
            Profile
          </NavLink>
        </nav>

        <div className="cd-actions">
          <button className="cd-btn cd-btnGhost" onClick={toggle} type="button">
            Toggle theme
          </button>

          <button
            className="cd-btn cd-btnGhost"
            onClick={() => {
              clear();
              navigate('/products');
            }}
            type="button"
            title="Clear cart"
          >
            {cartLabel}
          </button>

          {isAuthed ? (
            <button className="cd-btn" onClick={logout} type="button" title="Log out">
              Logout {user.name}
            </button>
          ) : (
            <form
              className="cd-login"
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = name.trim();
                if (!trimmed) return;
                login(trimmed);
                setName('');
              }}
            >
              <input
                className="cd-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="cd-btn" type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}

