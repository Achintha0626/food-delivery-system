const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const {
  assignDelivery,
  updateStatus,
  getDelivery,
} = require("../controllers/deliveryController");

const router = express.Router();

// Admin only: Assign a delivery
router.post("/", authenticate, authorize("admin"), assignDelivery);

// Delivery person only: Update delivery status
router.patch(
  "/:deliveryId/status",
  authenticate,
  authorize("delivery"),
  updateStatus
);

// Any authenticated user: Track a delivery
router.get("/:deliveryId", authenticate, getDelivery);

module.exports = router;
