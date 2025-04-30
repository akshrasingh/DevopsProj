import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      alert("✅ Login successful!");

      // Save token and user data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update authentication state
      setIsAuthenticated(true);

      // Navigate to HomePage
      navigate("/home");
    } catch (error) {
      alert("❌ Login failed");
      console.error(error.response?.data);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
        <div className="input-group">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f9;
        }

        .login-form {
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 300px;
        }

        .form-title {
          text-align: center;
          margin-bottom: 20px;
          font-family: "Arial", sans-serif;
          font-size: 24px;
          color: #333;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
        }

        .input-field:focus {
          border-color: #6c5ce7;
          outline: none;
        }

        .submit-btn {
          width: 100%;
          padding: 10px;
          border: none;
          background-color: rgb(51, 113, 77);
          color: white;
          font-size: 16px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: rgb(50, 111, 73);
        }

        .register-link {
          text-align: center;
          margin-top: 15px;
        }

        .register-link a {
          color: #6c5ce7;
          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
