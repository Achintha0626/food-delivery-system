const express = require("express");
const {
  createRestaurant,
  addMenuItem,
  getMenu,
} = require("../controllers/restaurantController");
const { authenticate, authorize } = require("../middleware/auth");
const router = express.Router();

// Create a new restaurant (admin only)
router.post("/", authenticate, authorize("admin"), createRestaurant);

// Add a menu item to a restaurant (admin only)

router.post(
  "/:restaurantId/menu",
  authenticate,
  authorize("admin"),
  addMenuItem
);

// Get menu items for a restaurant
router.get("/:restaurantId/menu", authenticate, getMenu);

module.exports = router;
