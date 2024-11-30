import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const isLoginPage = location.pathname === "/";

  return (
    <div className="Header">
      <Link to="/" className="logo">
        <h1 className="Textheader">MasakApaHari.ini</h1>
      </Link>

      {!isLoginPage && (
        <>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`Navbar ${isMenuOpen ? 'open' : ''}`}>
            <ul className="NavLinks">
              <li>
                <Link to="/Resep" className={isActive("/Resep")}>
                  Semua Resep
                </Link>
              </li>
              <li>
                <Link to="/popular" className={isActive("/popular")}>
                  Resep Populer
                </Link>
              </li>
              <li>
                <Link to="/About" className={isActive("/About")}>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/Contact" className={isActive("/Contact")}>
                  Kontak
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
