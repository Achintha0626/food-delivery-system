const express = require("express");
const { authenticate } = require("../middleware/auth");
const { createOrder, getOrderById } = require("../controllers/orderController");

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/:orderId", authenticate, getOrderById);

module.exports = router;
