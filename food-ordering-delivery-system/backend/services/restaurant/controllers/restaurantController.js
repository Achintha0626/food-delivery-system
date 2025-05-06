const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

// ─── Restaurants ────────────────────────────────────────────────────────────────

// [POST] /restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, address, description, image, isOpen, openTime, closeTime } =
      req.body;

    const restaurant = new Restaurant({
      name,
      address,
      description,
      image,
      isOpen,
      openTime,
      closeTime,
      menuCategories: [], // CHANGED: initialize empty categories
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /restaurant
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("menu");
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /restaurant/:restaurantId
exports.getRestaurant = async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.restaurantId).populate(
      "menu"
    );
    if (!r) return res.status(404).json({ error: "Not found" });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [PUT] /restaurant/:restaurantId
exports.updateRestaurant = async (req, res) => {
  try {
    const updates = (({
      name,
      address,
      description,
      image,
      isOpen,
      openTime,
      closeTime,
    }) => ({
      name,
      address,
      description,
      image,
      isOpen,
      openTime,
      closeTime,
    }))(req.body);

    const r = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      updates,
      { new: true }
    );
    if (!r) return res.status(404).json({ error: "Not found" });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [DELETE] /restaurant/:restaurantId
exports.deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    // 1) delete all menu-items
    await Menu.deleteMany({ restaurant: restaurantId });
    // 2) delete restaurant
    const deleted = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Restaurant and its menu items deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ─── Menu-Categories (Menus) ───────────────────────────────────────────────────

// [POST] /restaurant/:restaurantId/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Not found" });

    const id = Date.now().toString();
    const category = { id, name, image };
    restaurant.menuCategories.push(category);
    await restaurant.save();

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /restaurant/:restaurantId/categories
exports.getCategories = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Not found" });
    res.json(restaurant.menuCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [PUT] /restaurant/:restaurantId/categories/:catId
exports.updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { restaurantId, catId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    const cat = restaurant.menuCategories.find((c) => c.id === catId);
    if (!cat) return res.status(404).json({ error: "Category not found" });

    cat.name = name ?? cat.name;
    cat.image = image ?? cat.image;

    await restaurant.save();
    res.json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [DELETE] /restaurant/:restaurantId/categories/:catId
exports.deleteCategory = async (req, res) => {
  try {
    const { restaurantId, catId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    restaurant.menuCategories = restaurant.menuCategories.filter(
      (c) => c.id !== catId
    );
    await restaurant.save();

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ─── Menu-Items ───────────────────────────────────────────────────────────────

// [POST] /restaurant/:restaurantId/menu
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Not found" });

    const item = new Menu({
      name,
      description,
      price,
      image,
      category,
      restaurant: restaurant._id,
    });
    await item.save();
    restaurant.menu.push(item._id);
    await restaurant.save();

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /restaurant/:restaurantId/menu
exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    ).populate("menu");
    if (!restaurant) return res.status(404).json({ error: "Not found" });
    res.json(restaurant.menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [PUT] /restaurant/:restaurantId/menu/:itemId
exports.updateMenuItem = async (req, res) => {
  try {
    const updates = (({ name, description, price, image, category }) => ({
      name,
      description,
      price,
      image,
      category,
    }))(req.body);

    const item = await Menu.findByIdAndUpdate(req.params.itemId, updates, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// [DELETE] /restaurant/:restaurantId/menu/:itemId
exports.deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const item = await Menu.findByIdAndDelete(itemId);
    if (!item) return res.status(404).json({ error: "Not found" });

    await Restaurant.findByIdAndUpdate(restaurantId, {
      $pull: { menu: itemId },
    });

    res.json({ message: "Menu item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
