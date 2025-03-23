import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";

const Food = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4500/items") // Adjust the URL as per your backend
      .then((res) => res.json())
      .then((data) => {
        const foodItems = data.filter((item) => item.menu === "FOOD"); // Filter Food items
        setItems(foodItems);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1><u>FOOD</u></h1>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.itemName}>{item.itemName}</span>
              <span className={styles.price}>${item.price}</span>
            </div>
            <p className={styles.designation}>{item.designation}</p>
          </div>
        ))
      ) : (
        <p>No food items available.</p>
      )}
    </div>
  );
};

export default Food;
