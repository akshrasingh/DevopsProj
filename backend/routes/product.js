const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const authenticateToken = require("../middleware/auth");

// Routes for products
router.get("/products", productController.getAllProducts); // Get all products
router.get("/products/:id", productController.getProductById); // Get product by ID
router.post("/products", authenticateToken, productController.createProduct); // Create product
router.put("/products/:id", authenticateToken, productController.updateProduct); // Update product
router.delete(
  "/products/:id",
  authenticateToken,
  productController.deleteProduct
); // Delete product

module.exports = router;
