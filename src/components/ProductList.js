import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaShoppingCart } from "react-icons/fa"; // Font Awesome icons for Home and Cart

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Add product to the cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Product added to cart!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.navBar}>
        <FaHome onClick={() => navigate("/home")} style={styles.icon} />
        <FaShoppingCart onClick={() => navigate("/cart")} style={styles.icon} />
      </div>

      <h1 style={styles.title}>🌸 Our Floral Collection</h1>

      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productPrice}>₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "24px",
    cursor: "pointer",
    color: "#4CAF50",
  },
  title: {
    color: "#b22257",
    fontSize: "32px",
    marginBottom: "20px",
  },
  productsGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  productCard: {
    width: "250px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    padding: "15px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  productName: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#333",
  },
  productPrice: {
    fontSize: "16px",
    color: "#b22257",
    marginTop: "5px",
  },
  addToCartButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default ProductList;
