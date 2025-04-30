const { Sequelize } = require("sequelize");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306, // MySQL default port
    logging: false,
    dialectOptions: {
      charset: "utf8mb4", // You can try setting this to utf8mb4 for better encoding support
    },
  }
);

module.exports = sequelize;
