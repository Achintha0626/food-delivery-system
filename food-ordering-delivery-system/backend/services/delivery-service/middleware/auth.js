const jwt = require("jsonwebtoken");

// Authenticate user by verifying JWT token
function authenticate(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

// Check if user has the required role (e.g., admin, delivery)
function authorize(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}

module.exports = { authenticate, authorize };
