const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authenticateToken = (req, res, next) => {
  // Skip token verification in test environment
  if (process.env.NODE_ENV === "test") {
    return next(); // Skip authentication in test environment
  }

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
