const Delivery = require("../models/Delivery");

// 1. Assign a delivery to a driver (Admin only)
exports.assignDelivery = async (req, res) => {
  const { orderId, deliveryPersonId } = req.body;

  // Validate the request body
  if (!orderId || !deliveryPersonId) {
    return res.status(400).send("Missing orderId or deliveryPersonId");
  }

  // Create a new delivery
  const delivery = new Delivery({
    orderId,
    deliveryPersonId,
    status: "assigned",
  });

  await delivery.save();
  res.status(201).send(delivery);
};

// 2. Update the delivery status (Delivery person only)
exports.updateStatus = async (req, res) => {
  const { deliveryId } = req.params;
  const { status } = req.body;

  // Validate the status
  if (!["assigned", "accepted", "enroute", "delivered"].includes(status)) {
    return res.status(400).send("Invalid status");
  }

  const delivery = await Delivery.findByIdAndUpdate(
    deliveryId,
    { status, updatedAt: Date.now() },
    { new: true }
  );

  if (!delivery) return res.status(404).send("Delivery not found");
  res.send(delivery);
};

// 3. Track a delivery (Any authenticated user)
exports.getDelivery = async (req, res) => {
  const { deliveryId } = req.params;

  const delivery = await Delivery.findById(deliveryId);

  if (!delivery) return res.status(404).send("Delivery not found");
  res.send(delivery);
};
