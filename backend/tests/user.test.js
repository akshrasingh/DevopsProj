const request = require("supertest");
const app = require("../server");

// tests/user.test.js
const { sequelize, User, Product } = require("../models"); // ✅ Ensure Product is loaded

beforeAll(async () => {
  await sequelize.sync({ force: true }); // ✅ Will now create both tables
});

describe("User Routes", () => {
  beforeAll(async () => {
    // Reset the database before tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close DB connection after tests
    await sequelize.close();
  });

  it("should register a new user", async () => {
    const newUser = {
      name: "testiuser", // ✅ matches model
      email: "testiuser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.name).toBe("testiuser");
    expect(response.body.user.email).toBe("testiuser@example.com");
  });

  it("should login the user", async () => {
    const loginUser = {
      email: "testiuser@example.com",
      password: "password123",
    };

    const response = await request(app).post("/api/auth/login").send(loginUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
