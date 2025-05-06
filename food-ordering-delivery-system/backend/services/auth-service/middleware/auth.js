const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

// Middleware to check user's role
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};

module.exports = { authenticate, authorize };
