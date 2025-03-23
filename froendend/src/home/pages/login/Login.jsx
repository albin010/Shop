import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!adminEmail || !adminPassword) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4500/AdminLogin", {
        adminEmail,
        adminPassword,
      });

      alert(response.data.message);
      setError("");
      navigate("/Admin"); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;