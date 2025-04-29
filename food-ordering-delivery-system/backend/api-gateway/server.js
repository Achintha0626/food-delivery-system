require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3004", // Allow requests from frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Allow necessary headers
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

// API Gateway Routes and Proxy Setup
// Proxy to auth-service
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE || "http://auth-service:3000", // Auth service URL
    changeOrigin: true,
    pathRewrite: { "^/auth": "" }, // Remove /auth prefix when forwarding request
    onError: (err, req, res) => {
      console.error(`Error occurred while proxying: ${err.message}`);
      res.status(500).send("Internal Server Error");
    },
  })
);

// Proxy to restaurant-service
app.use(
  "/restaurant",
  createProxyMiddleware({
    target: process.env.RESTAURANT_SERVICE || "http://restaurant-service:3000", // Restaurant service URL
    changeOrigin: true,
    pathRewrite: { "^/restaurant": "" }, // Remove /restaurant prefix when forwarding request
  })
);

// Proxy to order-service
app.use(
  "/order",
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE || "http://order-service:3000", // Order service URL
    changeOrigin: true,
    pathRewrite: { "^/order": "" }, // Remove /order prefix when forwarding request
  })
);

// Proxy to delivery-service
app.use(
  "/delivery",
  createProxyMiddleware({
    target: process.env.DELIVERY_SERVICE || "http://delivery-service:3000", // Delivery service URL
    changeOrigin: true,
    pathRewrite: { "^/delivery": "" }, // Remove /delivery prefix when forwarding request
  })
);

// Health check (optional)
app.use("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start the API Gateway Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
