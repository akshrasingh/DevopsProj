import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, such as processing payment or confirming the order
    console.log("Order placed with the following details:");
    console.log("Address:", address);
    console.log("Payment Method:", paymentMethod);
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      maxWidth: "800px",
      margin: "0 auto",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      position: "relative",
    },
    topNav: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "20px",
    },
    homeLink: {
      textDecoration: "none",
      fontSize: "1.2rem",
      color: "#4a90e2",
    },
    title: {
      textAlign: "center",
      fontSize: "2.5rem",
      color: "#333",
      marginBottom: "30px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    label: {
      fontSize: "1.2rem",
      color: "#555",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
    },
    select: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
    },
    button: {
      backgroundColor: "#f2b900",
      color: "white",
      padding: "12px 30px",
      fontSize: "1.2rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "20px",
    },
    buttonHover: {
      backgroundColor: "#e39f00",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Nav with Home Icon */}
      <div style={styles.topNav}>
        <Link to="/home" style={styles.homeLink}>
          🏠 Home
        </Link>
      </div>

      <h1 style={styles.title}>Checkout</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Shipping Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            {/* Add more payment options if needed */}
          </select>
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
