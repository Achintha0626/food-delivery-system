const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const ctrl = require("../controllers/restaurantController");

// ─── Public ───────────────────────────────────────────────────────────────────
router.get("/", ctrl.getRestaurants);
router.get("/:restaurantId", ctrl.getRestaurant);

// ─── Admin-only Restaurants ──────────────────────────────────────────────────
router.post("/", authorize("admin"), ctrl.createRestaurant);
router.put("/:restaurantId", authorize("admin"), ctrl.updateRestaurant);
router.delete("/:restaurantId", authorize("admin"), ctrl.deleteRestaurant);

// ─── Menu-Categories (aka “Menus”) ────────────────────────────────────────────
router.get("/:restaurantId/categories", ctrl.getCategories);
router.post(
  "/:restaurantId/categories",
  authorize("admin"),
  ctrl.createCategory
);
// CHANGED: allow editing a menu/category
router.put(
  "/:restaurantId/categories/:catId",
  authorize("admin"),
  ctrl.updateCategory
);
// CHANGED: allow deleting a menu/category
router.delete(
  "/:restaurantId/categories/:catId",
  authorize("admin"),
  ctrl.deleteCategory
);

// ─── Menu-Items ───────────────────────────────────────────────────────────────
router.post("/:restaurantId/menu", authorize("admin"), ctrl.addMenuItem);
router.get("/:restaurantId/menu", ctrl.getMenu);
router.put(
  "/:restaurantId/menu/:itemId",
  authorize("admin"),
  ctrl.updateMenuItem
);
router.delete(
  "/:restaurantId/menu/:itemId",
  authorize("admin"),
  ctrl.deleteMenuItem
);

module.exports = router;
