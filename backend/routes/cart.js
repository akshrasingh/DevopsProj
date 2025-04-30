const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");

const authenticate = require("../middleware/auth"); // JWT verification middleware

// Middleware to ensure user is authenticated
router.use(authenticate);

// Add item to cart
router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming JWT is decoded to give user ID

  // Check if product exists
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Check if product is already in the cart
  const cartItem = await Cart.findOne({ where: { userId, productId } });
  if (cartItem) {
    cartItem.quantity += quantity; // Update quantity if item is already in cart
    await cartItem.save();
    return res.status(200).json(cartItem);
  }

  // Add new cart item
  const newCartItem = await Cart.create({ userId, productId, quantity });
  res.status(201).json(newCartItem);
});

// Get user's cart items
router.get("/", async (req, res) => {
  const userId = req.user.id;

  const cartItems = await Cart.findAll({
    where: { userId },
    include: Product, // Fetch associated product details
  });

  res.status(200).json(cartItems);
});

// Remove item from cart
router.delete("/:productId", async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cartItem = await Cart.findOne({ where: { userId, productId } });
  if (!cartItem) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  await cartItem.destroy();
  res.status(200).json({ message: "Item removed from cart" });
});

// Update cart item quantity
router.patch("/:productId", async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  const cartItem = await Cart.findOne({ where: { userId, productId } });
  if (!cartItem) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  // Prevent setting quantity less than 1
  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity cannot be less than 1" });
  }

  cartItem.quantity = quantity;
  await cartItem.save();
  res.status(200).json(cartItem);
});

module.exports = router;
