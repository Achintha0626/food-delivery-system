const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurant");
const { authenticate } = require("./middleware/auth");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/restaurant", authenticate, restaurantRoutes); // Protecting routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Restaurant service connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Restaurant service running on port ${PORT}`);
});
