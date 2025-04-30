import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample products data
const sampleProducts = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 150 },
  { id: 3, name: "Product 3", price: 200 },
];

// CartPage component
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find((item) => item.id === product.id);
      if (existingItem) {
        return prevState.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevState, { ...product, quantity: 1 }];
      }
    });
  };

  // Update item quantity (increase or decrease)
  const updateQuantity = (productId, type) => {
    setCartItems((prevState) =>
      prevState.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                type === "increase" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };

  // Remove item from the cart
  const removeItem = (productId) => {
    setCartItems((prevState) =>
      prevState.filter((item) => item.id !== productId)
    );
  };

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.cartTitle}>Shopping Cart</h1>

      {/* Product List Section */}
      <div style={styles.productList}>
        <h2 style={styles.sectionTitle}>Products</h2>
        <div style={styles.products}>
          {sampleProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>₹{product.price}</p>
              <button
                style={styles.addToCartButton}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div style={styles.cartItems}>
        <h2 style={styles.sectionTitle}>Your Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{item.name}</h3>
                <p style={styles.cartItemPrice}>₹{item.price}</p>
                <div style={styles.quantityContainer}>
                  <button
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, "decrease")}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={styles.quantityText}>{item.quantity}</span>
                  <button
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                style={styles.removeButton}
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p style={styles.emptyCart}>Your cart is empty.</p>
        )}
      </div>

      {/* Total Price and Checkout */}
      {cartItems.length > 0 && (
        <>
          <h3 style={styles.totalPrice}>Total: ₹{totalPrice}</h3>
          <div style={styles.checkoutButtonContainer}>
            <Link to="/checkout">
              <button style={styles.checkoutButton}>Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

// Inline styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
    color: "#333",
  },
  cartTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  productList: {
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "15px",
  },
  products: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  productCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "200px",
    textAlign: "center",
    transition: "transform 0.2s ease",
  },
  productName: {
    fontSize: "1.3rem",
    color: "#333",
  },
  productPrice: {
    fontSize: "1.2rem",
    color: "#666",
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1rem",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  cartItems: {
    marginTop: "30px",
  },
  cartItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cartItemDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cartItemName: {
    fontSize: "1.6rem",
    color: "#333",
  },
  cartItemPrice: {
    fontSize: "1.3rem",
    color: "#666",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  quantityButton: {
    padding: "8px 12px",
    margin: "0 5px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease",
  },
  quantityText: {
    fontSize: "1.4rem",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease",
  },
  totalPrice: {
    fontSize: "1.5rem",
    marginTop: "20px",
    color: "#333",
  },
  checkoutButtonContainer: {
    marginTop: "40px",
  },
  checkoutButton: {
    backgroundColor: "#f2b900",
    color: "white",
    padding: "12px 30px",
    fontSize: "1.3rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  checkoutButtonHover: {
    backgroundColor: "#e1a500",
  },
};
