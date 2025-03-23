import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons for simplicity

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyLogo</div>

      {/* Hamburger Menu for Mobile */}
      <div className={styles.hamburger} onClick={toggleMenu} aria-label={menuOpen ? "Close menu" : "Open menu"}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Navigation Links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/" onClick={toggleMenu}>Menu</Link></li>
        <li><Link to="/" onClick={toggleMenu}>Make a Reservation</Link></li>
        <li><Link to="/" onClick={toggleMenu}>Contact Us</Link></li>
      </ul>

      {/* Login Button (Hidden in Mobile Menu) */}
      <Link to="/login">
        <button className={styles.loginButton}>Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;
