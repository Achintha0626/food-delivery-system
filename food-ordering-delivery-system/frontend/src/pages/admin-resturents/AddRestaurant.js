
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import api from "../../services/api";

export default function AddRestaurantPage() {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImagePreviewUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      address,
      description,
      image: imagePreviewUrl,
      isOpen,
      openTime,
      closeTime,
    };
    try {
      const { data } = await api.post("/restaurant", payload);
     
      navigate("/admin/restaurants");
    } catch (err) {
      console.error("AddRestaurant error:", err);
      alert("Failed to add restaurant. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300`}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Add New Restaurant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Restaurant Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status:
                </label>
                <select
                  value={isOpen}
                  onChange={(e) => setIsOpen(e.target.value === "true")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value={true}>Open</option>
                  <option value={false}>Closed</option>
                </select>
              </div>

              {/* Open/Close Times */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Open Time:
                  </label>
                  <input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Close Time:
                  </label>
                  <input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
                {imagePreviewUrl && (
                  <div className="mt-2">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="max-h-40 rounded"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Restaurant
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
