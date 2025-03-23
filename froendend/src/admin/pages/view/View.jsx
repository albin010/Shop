import React, { useEffect, useState } from "react";
import styles from "./View.module.css";

const View = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4500/items") // Replace with your actual backend URL
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Item List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Menu</th>
            <th>Item Name</th>
            <th>Designation</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.menu}</td>
              <td>{item.itemName}</td>
              <td>{item.designation}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
   