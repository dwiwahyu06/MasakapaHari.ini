

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="Header">
      <h1 className="Textheader">MasakApaHari.ini</h1>
      <nav className="Navbar">
        <ul className="NavLinks">
          {/* <li><Link to="/">Login</Link></li>
          <li><Link to="/Resep">Resep</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Contact">Contact</Link></li> */}
        </ul>
      </nav>
    </div>
  );
}
