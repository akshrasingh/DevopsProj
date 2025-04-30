const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust to your DB config

const Cart = sequelize.define("Cart", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1, // Default quantity is 1
    allowNull: false,
  },
});

module.exports = Cart;
