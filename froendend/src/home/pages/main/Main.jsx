import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";

const Main = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4500/items") // Adjust the URL as per your backend
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1><u>ALL</u></h1>
      {items.map((item) => (
        <div key={item._id} className={styles.item}>
          <div className={styles.header}>
            <span className={styles.itemName}>{item.itemName}</span>
            <span className={styles.price}>${item.price}</span>
          </div>
          <p className={styles.designation}>{item.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default Main;
