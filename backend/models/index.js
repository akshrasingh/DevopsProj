// models/index.js
const sequelize = require("../config/db");
const Product = require("./product");
const User = require("./user");

module.exports = {
  sequelize,
  Product,
  User,
};
