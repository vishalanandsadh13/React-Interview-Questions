import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar.jsx';

export function Layout() {
  return (
    <div className="cd-appShell">
      <NavBar />
      <main className="cd-container cd-main">
        <Outlet />
      </main>
      <footer className="cd-footer">
        <div className="cd-container cd-footerRow">
          <span>Context API demo (Theme/Auth/Cart)</span>
          <span className="cd-muted">State persisted to localStorage</span>
        </div>
      </footer>
    </div>
  );
}

