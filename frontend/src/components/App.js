import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Homepage";
import ProductPage from "./ProductList";
import CartPage from "./Cartpage";
import CheckoutPage from "./Checkoutpage";
import Register from "./register";
import Login from "./login";
import { useState, useEffect } from "react";

function App() {
  // On app load, check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for token to maintain auth state across refreshes
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default path goes to Login */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* After login, redirect to HomePage */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
