import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  // Logout function to clear localStorage and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT token
    localStorage.removeItem("user"); // Clear user info
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {/* Logout Button */}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero" />

      {/* Title below the hero */}
      <div className="hero-text">
        <h1>Welcome to AksFlora</h1>
      </div>

      {/* About Section */}
      <div className="about">
        <h2>About Us</h2>
        <p>
          We offer a wide variety of fresh and beautiful flowers for all
          occasions. Whether you're celebrating a birthday, wedding, or just
          want to brighten up your day, our flowers are here to make every
          moment special.
        </p>
      </div>

      {/* Cart Logo Section */}
      <div className="cart-logo">
        <Link to="/cart">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
            alt="Cart"
          />
          <p>Go to Cart</p>
        </Link>
      </div>

      <style jsx>{`
        .homepage {
          font-family: Arial, sans-serif;
          text-align: center;
          overflow-x: hidden;
        }

        /* Navbar Styling */
        .navbar {
          background-color: rgb(76, 118, 68);
          padding: 10px;
        }
        .navbar ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
        }
        .navbar li {
          margin: 0 15px;
        }
        .navbar a {
          text-decoration: none;
          color: white;
          font-size: 1.2rem;
        }
        .navbar a:hover {
          color: #f2b900;
        }

        /* Hero Section */
        .hero {
          background-image: url("https://png.pngtree.com/png-clipart/20230816/original/pngtree-colorful-vector-illustration-of-a-detailed-florist-at-a-flower-kiosk-vector-picture-image_10836319.png");
          background-size: cover;
          background-position: center;
          height: 50vh;
          width: 100%;
        }

        /* Hero Text Styling */
        .hero-text {
          margin-top: 20px;
        }
        .hero-text h1 {
          font-size: 3rem;
          margin: 0;
          color: #2e7d32;
        }

        /* About Section */
        .about {
          background-color: #f9f4fb;
          padding: 50px 20px;
        }
        .about h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .about p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Cart Logo */
        .cart-logo {
          margin: 50px 0;
        }
        .cart-logo img {
          width: 50px;
          height: 50px;
        }
        .cart-logo p {
          font-size: 1.5rem;
          margin-top: 10px;
        }
        .cart-logo a {
          text-decoration: none;
          color: #333;
        }

        /* Button Styling */
        .navbar button {
          background-color: rgb(33, 89, 56);
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .navbar button:hover {
          background-color: rgb(61, 115, 82);
        }
      `}</style>
    </div>
  );
}

export default HomePage;
