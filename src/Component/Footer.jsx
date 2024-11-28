import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="text-footer">&copy; 2024 MasakapaHari.ini. All rights reserved.</p>
        <ul className="footer-links">
        <li><Link to="/About">About Us</Link></li>
          <li><a href="/Contact">Contact</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><Link to="/Resep">Resep</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
