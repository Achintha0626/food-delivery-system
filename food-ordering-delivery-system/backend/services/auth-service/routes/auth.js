const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authenticate, authorize } = require("../middleware/auth");
const router = express.Router();

// Register a new user (admin, customer, or delivery)
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    role,
    address,
    location,
  } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send("User already exists");

  // Create and save a new user
  const user = new User({
    firstName,
    lastName,
    email,
    username,
    password,
    role,
    address: role === "customer" ? address : undefined, // Only add address if customer
    location: role === "delivery" ? location : undefined, // Only add location if delivery
  });

  // Hash password before saving
  await user.save();

  // Generate JWT token
  const token = user.generateAuthToken();
  res.status(201).send({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
  });
});

// Login a user and return a JWT token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials");

  // Compare password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  // Generate JWT token
  const token = user.generateAuthToken();
  res.send({
    token,
    user: { id: user._id, username: user.username, role: user.role },
  });
});

module.exports = router;
