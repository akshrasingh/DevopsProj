const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Product name is required
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false, // Price is required
  },
  image: {
    type: DataTypes.STRING,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default stock quantity is 0
  },
});

module.exports = Product;
