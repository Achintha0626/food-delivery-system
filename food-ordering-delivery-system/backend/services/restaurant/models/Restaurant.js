const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: String,
    image: String, // store URL or base64
    isOpen: { type: Boolean, default: true },
    openTime: String,
    closeTime: String,
    menu: [
      {
        // existing menu-items refs
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    menuCategories: [
      // CHANGED: persisted categories
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        image: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
