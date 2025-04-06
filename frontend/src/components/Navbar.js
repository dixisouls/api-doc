import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Close menu when location changes
    closeMenu();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <i className="fas fa-code"></i>
            <span>Forge API</span>
          </Link>

          <div className="navbar-menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/" onClick={closeMenu}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className={location.pathname === "/generate" ? "active" : ""}>
              <Link to="/generate" onClick={closeMenu}>
                <i className="fas fa-magic"></i> Generate
              </Link>
            </li>
            <li className={location.pathname === "/about" ? "active" : ""}>
              <Link to="/about" onClick={closeMenu}>
                <i className="fas fa-info-circle"></i> About
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/dixisouls"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-github"
                onClick={closeMenu}
              >
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
