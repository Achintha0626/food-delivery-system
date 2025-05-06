const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/order");
const { authenticate } = require("./middleware/auth");
require("dotenv").config();

const app = express();

// ← THIS is critical: parse incoming JSON bodies
app.use(express.json());

app.use("/order", authenticate, orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Order service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
