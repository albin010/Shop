import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Panel</h2>
      <ul className={styles.menu}>
        <li><Link to="/Admin/adminpage">Admin</Link></li>
        <li><Link to="/Admin/menu">Menu</Link></li>
        <li><Link to="/Admin/item">Items</Link></li>
        <li><Link to="/Admin/view">View</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

