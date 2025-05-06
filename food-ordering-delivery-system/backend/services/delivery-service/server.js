require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const deliveryRoutes = require("./routes/delivery");
const { authenticate } = require("./middleware/auth");

const app = express();

// Parse JSON bodies
app.use(express.json());

// Mount delivery routes
app.use("/delivery", authenticate, deliveryRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✔ Delivery service connected to MongoDB");
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () =>
      console.log(`🚀 Delivery service running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Mongo connection error:", err));
