const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("AksFlora backend running🌸"));
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);

// Sequelize DB Authentication
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL Connected");
    return sequelize.sync();
  })
  .then(() => {
    console.log("🗂️ All models were synchronized successfully.");

    // ✅ Bind to 0.0.0.0 to accept external connections
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err);
  });

module.exports = app;
