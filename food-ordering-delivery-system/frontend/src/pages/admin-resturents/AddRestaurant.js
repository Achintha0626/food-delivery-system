import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";

function AddRestaurant({ onRestaurantAdded }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreviewUrl("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRestaurant = {
      _id: Date.now().toString(), // Simple unique ID for demo
      name,
      address,
      isOpen,
      openTime,
      closeTime,
      image: imagePreviewUrl, // Using preview URL for demo
      description,
    };
    onRestaurantAdded(newRestaurant);
    alert(`Restaurant "${name}" added (locally)!`);
    navigate("/admin/restaurants");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 ease-in-out`}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Add New Restaurant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Restaurant Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Restaurant Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Location"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="isOpen"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Status:
                </label>
                <select
                  id="isOpen"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={isOpen}
                  onChange={(e) => setIsOpen(e.target.value === "true")}
                >
                  <option value={true}>Open</option>
                  <option value={false}>Closed</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label
                    htmlFor="openTime"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Open Time:
                  </label>
                  <input
                    type="time"
                    id="openTime"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="closeTime"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Close Time:
                  </label>
                  <input
                    type="time"
                    id="closeTime"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreviewUrl && (
                  <div className="mt-2">
                    <img
                      src={imagePreviewUrl}
                      alt="Image Preview"
                      className="max-h-40"
                    />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Restaurant
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddRestaurant;
