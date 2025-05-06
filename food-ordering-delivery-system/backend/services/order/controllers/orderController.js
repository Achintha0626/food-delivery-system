const Order = require('../models/Order');

// Place a new order
exports.createOrder = async (req, res) => {
  const { restaurantId, items } = req.body;
  // Here you could optionally call Restaurant Service to validate IDs:
  // const menu = await axios.get(`http://restaurant-service:3001/restaurant/${restaurantId}/menu`);

  const order = new Order({
    customerId:   req.user._id,
    restaurantId,
    items
  });

  await order.save();
  res.status(201).send(order);
};

// Fetch order details
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).send('Order not found');
  res.send(order);
};
