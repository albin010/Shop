import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminNavbar.module.css';

const AdminNavbar = () => {

    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Perform logout logic (e.g., clearing tokens)
      localStorage.removeItem("authToken");
  
      // Redirect to login page
      navigate("/");
    };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>Admin Panel</h2>
      </div>
      <ul className={styles.navLinks}>
       
      <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
