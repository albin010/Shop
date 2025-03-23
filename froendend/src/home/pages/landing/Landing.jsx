import React, { useState, useRef, } from "react";
import styles from "./Landing.module.css"; // Import CSS module
import Food from "../main/Food";
import Drinks from "../main/Drinkes";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import Bruch from "../main/Bruch";


const Landing = () => {
  const [activeSection, setActiveSection] = useState("all"); // Default to "All"
  const sectionRef = useRef(null);
  const handleShowSection = (section) => {
    setActiveSection(section);
    
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // useEffect(() => {
  //   // Scroll to the default "All" section on page load
  //   setTimeout(() => {
  //     sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 200);
  // }, []);

  return (
    <div className={styles.container}>
      {/* Dark Overlay */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.menuTitle}>Menu</h1>
        <p className={styles.menuDescription}>
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to
          place an order, use the "Order Online" button below the menu.
        </p>

        {/* Category Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.menuButton} onClick={() => handleShowSection("food")}>
            Food
          </button>
          <button className={`${styles.menuButton} ${styles.drinksButton}`} onClick={() => handleShowSection("drinks")}>
            Drinks
          </button>
          <button className={styles.menuButton} onClick={() => handleShowSection("brunch")}>
            Brunch
          </button>
          <button className={styles.menuButton} onClick={() => handleShowSection("all")}>
            All
          </button>
        </div>
      </div>

      {/* Section Content - "All" is shown by default */}
      <div ref={sectionRef} className={styles.sectionContent}>
        {activeSection === "food" && <Food />}
        {activeSection === "drinks" && <Drinks />}
        {activeSection === "brunch" && <Bruch />}
        {activeSection === "all" && <Main />} {/* Default section */}
      </div>

      {/* Footer (Always Visible) */}
      <Footer />
    </div>
  );
};

export default Landing;
