import React from "react";
import styles from "./Footer.module.css"; // Importing the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Left Section - Contact Info */}
        <div className={styles.footerBox}>
          <h3 className={styles.footerHeading}>CONNECT WITH US</h3>
          <p>📞 +91 9567604340</p>
          <p>✉ info@deepnetsoft.com</p>
        </div>

        {/* Center Section - Logo & Social Icons */}
        <div className={styles.footerBox}>
          <img src="/logo.png" alt="Deep Net Soft Logo" className={styles.logo} />
          <h2 className={styles.brandName}>DEEP <span className={styles.highlight}>NET SOFT</span></h2>
          <div className={styles.socialIcons}>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Twitter</span>
          </div>
        </div>

        {/* Right Section - Address */}
        <div className={styles.footerBox}>
          <h3 className={styles.footerHeading}>FIND US</h3>
          <p>📍 First floor, Geo Infopark, Infopark EXPY, Kakkanad</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
        <div className={styles.links}>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
