// backend/services/restaurant/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authenticate } = require("./middleware/auth");
const restaurantRoutes = require("./routes/restaurant");

const app = express();

// ─── CORS ──────────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: "http://localhost:3004",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ─── BODY PARSING ─────────────────────────────────────────────────────────────
// CHANGED: raise JSON payload limit to 10MB to accommodate base64 images
app.use(express.json({ limit: "10mb" }));
// CHANGED: also raise urlencoded limit in case you switch form-encoding
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ─── AUTH + ROUTES ───────────────────────────────────────────────────────────
app.use("/restaurant", authenticate, restaurantRoutes);

// ─── MONGO + STARTUP ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Restaurant service connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Restaurant service running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));
