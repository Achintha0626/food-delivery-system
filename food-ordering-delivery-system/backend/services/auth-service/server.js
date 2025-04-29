const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration to allow frontend and API Gateway
const corsOptions = {
  origin: "http://localhost:3004", // Allow the frontend to access this API
  methods: ["GET", "POST", "OPTIONS"], // Allow GET, POST, OPTIONS methods
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Allow these headers
};

app.use(cors(corsOptions)); // Use the CORS configuration

app.use(express.json()); // To parse incoming JSON requests
app.use("/auth", authRoutes); // Route for auth-related endpoints

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Auth Service connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
