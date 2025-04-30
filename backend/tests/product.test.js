const request = require("supertest");
const app = require("../server"); // Assuming the app instance is exported from server.js
const { sequelize } = require("../models"); // Sequelize instance
const Product = require("../models/product"); // Import Product model

beforeAll(async () => {
  // Sync the database before tests to create tables
  try {
    await sequelize.sync({ force: true }); // Force will drop and re-create tables
    console.log("Database synced for testing");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
});

afterEach(async () => {
  // Truncate the Product table after each test to remove all rows
  await Product.truncate({ cascade: true });
});

describe("Product Routes", () => {
  test("should create a new product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Testti Product",
      description: "Test description",
      price: 19.99,
      stockQuantity: 10,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.product).toHaveProperty("id");
    expect(res.body.product.name).toBe("Testti Product");
  });
});
