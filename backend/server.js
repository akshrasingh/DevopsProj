const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/user"); // Import auth routes
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => res.send("AksFlora backend running🌸"));

// Use the authentication routes
app.use("/api/auth", authRoutes); // All auth-related routes will be under /api/auth
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
// Sequelize DB Authentication
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL Connected");

    return sequelize.sync(); // <-- This line syncs your models to DB
  })
  .then(() => {
    console.log("🗂️ All models were synchronized successfully.");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err);
  });
