import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Hardcoded EC2 backend API endpoint
      const res = await axios.post(
        "http://3.94.166.203:5001/api/auth/register",
        form
      );

      alert("✅ Registered successfully!");
      console.log(res.data);
    } catch (error) {
      alert("❌ Registration failed");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Register</h2>
        <div className="input-group">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
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
          Register
        </button>
        <p className="login-link">
          Already have an account? <a href="/">Login here</a>
        </p>
      </form>

      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f9;
        }

        .register-form {
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
          background-color: rgb(44, 93, 57);
          color: white;
          font-size: 16px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: rgb(49, 125, 87);
        }

        .login-link {
          text-align: center;
          margin-top: 15px;
        }

        .login-link a {
          color: #6c5ce7;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;
