const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

// Create a new restaurant
const createRestaurant = async (req, res) => {
  const { name, address } = req.body;
  const restaurant = new Restaurant({ name, address });
  await restaurant.save();
  res.status(201).send(restaurant);
};

// Add a menu item to a restaurant
const addMenuItem = async (req, res) => {
  const { name, price, description } = req.body;
  const restaurant = await Restaurant.findById(req.params.restaurantId);

  if (!restaurant) return res.status(404).send("Restaurant not found");

  const menuItem = new Menu({
    name,
    price,
    description,
    restaurant: restaurant._id,
  });
  await menuItem.save();

  restaurant.menu.push(menuItem._id);
  await restaurant.save();

  res.status(201).send(menuItem);
};

// Get all menu items for a restaurant
const getMenu = async (req, res) => {
  const restaurant = await Restaurant.findById(
    req.params.restaurantId
  ).populate("menu");
  if (!restaurant) return res.status(404).send("Restaurant not found");
  res.send(restaurant.menu);
};

module.exports = { createRestaurant, addMenuItem, getMenu };
