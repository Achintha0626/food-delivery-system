import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Modal from "react-modal";

// Set the app element for react-modal
Modal.setAppElement("#root");

function ManageMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [restaurants] = useState([
    { _id: "1", name: "Delicious Diner" },
    { _id: "2", name: "Spicy Kitchen" },
    { _id: "3", name: "Fresh Fusion" },
  ]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [menuCategories] = useState([
    { id: "salad", name: "Salad", image: "menu_1.png" },
    { id: "rolls", name: "Rolls", image: "menu_2.png" },
    { id: "deserts", name: "Deserts", image: "menu_3.png" },
    { id: "sandwich", name: "Sandwich", image: "menu_4.png" },
    { id: "cake", name: "Cake", image: "menu_5.png" },
    { id: "pure-veg", name: "Pure Veg", image: "menu_6.png" },
    { id: "pasta", name: "Pasta", image: "menu_7.png" },
    { id: "noodles", name: "Noodles", image: "menu_8.png" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Initial dummy items
  const [menuItemsInCategory, setMenuItemsInCategory] = useState([
    {
      id: "s1",
      restaurantId: "1",
      categoryId: "salad",
      name: "Greek Salad",
      description: "Fresh and healthy Greek salad.",
      price: 12,
      image: "greek-salad.jpg",
    },
    {
      id: "s2",
      restaurantId: "1",
      categoryId: "salad",
      name: "Italian Chopped Salad",
      description: "Delicious Italian chopped salad.",
      price: 15,
      image: "ItalianChoppedSalad.webp",
    },
    {
      id: "r1",
      restaurantId: "1",
      categoryId: "rolls",
      name: "Chicken Spring Rolls",
      description: "Savory chicken spring rolls.",
      price: 8,
      image: "Chicken-Spring-Rolls.jpg",
    },
    {
      id: "d1",
      restaurantId: "1",
      categoryId: "deserts",
      name: "Panna Cotta",
      description: "Classic Italian panna cotta.",
      price: 10,
      image: "Panna-Cotta-desert.jpg",
    },
  ]);

  // Modal open states
  const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);

  // New item form fields
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);
  const [newItemImagePreviewUrl, setNewItemImagePreviewUrl] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRestaurantChange = (e) => {
    setSelectedRestaurantId(e.target.value);
    setSelectedCategory(null);
    setMenuItemsInCategory((prev) =>
      // filter out items not in this restaurant
      prev.filter((item) => item.restaurantId === e.target.value)
    );
  };

  const handleCategoryClick = (category) => {
    if (!selectedRestaurantId) {
      return alert("Please select a restaurant first.");
    }
    setSelectedCategory(category);
    setMenuItemsInCategory((prev) =>
      prev.filter(
        (item) =>
          item.restaurantId === selectedRestaurantId &&
          item.categoryId === category.id
      )
    );
  };

  const openAddMenuItemModal = () => {
    if (!selectedCategory) {
      return alert("Please select a category first.");
    }
    setIsAddMenuItemModalOpen(true);
  };

  const closeAddMenuItemModal = () => {
    setIsAddMenuItemModalOpen(false);
    // clear fields
    setNewItemName("");
    setNewItemDescription("");
    setNewItemPrice("");
    setNewItemImage(null);
    setNewItemImagePreviewUrl("");
  };

  const handleNewItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItemImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setNewItemImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setNewItemImage(null);
      setNewItemImagePreviewUrl("");
    }
  };

  const handleSaveNewMenuItem = () => {
    if (!newItemName || !newItemDescription || !newItemPrice || !newItemImage) {
      return alert("Please fill all fields and upload an image.");
    }

    const newItem = {
      id: Date.now().toString(),
      restaurantId: selectedRestaurantId,
      categoryId: selectedCategory.id,
      name: newItemName,
      description: newItemDescription,
      price: parseFloat(newItemPrice),
      // save the data-URL for preview
      image: newItemImagePreviewUrl,
    };

    setMenuItemsInCategory([...menuItemsInCategory, newItem]);
    closeAddMenuItemModal();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <NavBar
        className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      />

      {/* Main area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Manage Menu Items</h1>

            {/* Restaurant selector */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Restaurant:
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedRestaurantId}
                onChange={handleRestaurantChange}
              >
                <option value="">-- Select a Restaurant --</option>
                {restaurants.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category grid */}
            {selectedRestaurantId && !selectedCategory && (
              <>
                <h2 className="text-lg font-semibold mb-2">Select Category</h2>
                <div className="flex space-x-4 overflow-x-auto mb-4">
                  {menuCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="w-32 h-32 rounded-full overflow-hidden shadow cursor-pointer"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      <img
                        src={`/images/${cat.image}`}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="text-center mt-1 font-medium">
                        {cat.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Items grid */}
            {selectedCategory && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Menu Items in {selectedCategory.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {menuItemsInCategory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white shadow rounded overflow-hidden"
                    >
                      <img
                        src={
                          item.image.startsWith("data:")
                            ? item.image
                            : `/images/${item.image}`
                        }
                        alt={item.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.description}
                        </p>
                        <p className="font-bold text-indigo-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Add New Item card */}
                  <div
                    className="flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                    style={{ height: 200 }}
                    onClick={openAddMenuItemModal}
                  >
                    <div className="text-gray-600 text-center">
                      <svg
                        className="w-10 h-10 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                      <span>Add New Item</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Add New Menu Item Modal */}
      <Modal
        isOpen={isAddMenuItemModalOpen}
        onRequestClose={closeAddMenuItemModal}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000 },
          content: {
            maxWidth: 500,
            margin: "auto",
            borderRadius: 8,
            padding: 24,
          },
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            className="w-full border rounded px-3 py-2"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <textarea
            placeholder="Item Description"
            className="w-full border rounded px-3 py-2"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Item Price"
            className="w-full border rounded px-3 py-2"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleNewItemImageChange}
          />
          {newItemImagePreviewUrl && (
            <img
              src={newItemImagePreviewUrl}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeAddMenuItemModal}
              className="px-4 py-2 mr-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveNewMenuItem}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ManageMenu;
