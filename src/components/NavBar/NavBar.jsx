import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false); // close menu on route change
  }, [location.pathname]);

  return (
    <nav className={styles.navBar}>
      <Link to="/posts" className={styles.logo}>
        Blog Application
      </Link>

      <div className={styles.desktopLinks}>
        <Link to="/posts">Home</Link>
        <Link to="/posts/new">New Post</Link>
      </div>

      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu} data-testid="mobile-menu">
          <Link to="/posts" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/posts/new" onClick={toggleMobileMenu}>
            New Post
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
