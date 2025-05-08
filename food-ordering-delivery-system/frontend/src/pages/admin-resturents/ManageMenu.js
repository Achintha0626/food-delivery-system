
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import api from "../../services/api";

import RestaurantSelector from "../../components/resturent-admin/RestaurantSelector";
import CategoryList from "../../components/resturent-admin/CategoryList";
import MenuItemsGrid from "../../components/resturent-admin/MenuItemsGrid";
import CategoryModal from "../../components/resturent-admin/CategoryModal";
import ItemModal from "../../components/resturent-admin/ItemModal";

export default function ManageMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Restaurants
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  // Categories & Items
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [menuItemsInCategory, setMenuItemsInCategory] = useState([]);

  // Category modal state
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [menuName, setMenuName] = useState("");
  const [menuImage, setMenuImage] = useState("");

  // Item modal state
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/restaurant");
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to load restaurants", err);
      }
    })();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  // 1) Restaurant change
  async function handleRestaurantChange(e) {
    const id = e.target.value;
    setSelectedRestaurantId(id);
    setSelectedCategory(null);
    setMenuCategories([]);
    setAllMenuItems([]);
    setMenuItemsInCategory([]);
    if (!id) return;

    try {
      const [catsRes, itemsRes] = await Promise.all([
        api.get(`/restaurant/${id}/categories`),
        api.get(`/restaurant/${id}/menu`),
      ]);
      setMenuCategories(catsRes.data);
      setAllMenuItems(itemsRes.data.map((it) => ({ ...it, id: it._id })));
    } catch (err) {
      console.error(err);
    }
  }

  // 2) Category selection
  function selectCategory(cat) {
    setSelectedCategory(cat);
    setMenuItemsInCategory(allMenuItems.filter((i) => i.category === cat.id));
  }
  function backToMenus() {
    setSelectedCategory(null);
    setMenuItemsInCategory([]);
  }

  // 3) Category CRUD
  function openAddMenu() {
    setEditingCategory(null);
    setMenuName("");
    setMenuImage("");
    setIsAddMenuOpen(true);
  }
  function closeAddMenu() {
    setIsAddMenuOpen(false);
  }
  function onMenuImageChange(e) {
    const f = e.target.files[0];
    if (!f) return setMenuImage("");
    const r = new FileReader();
    r.onloadend = () => setMenuImage(r.result);
    r.readAsDataURL(f);
  }
  async function saveAddMenu() {
    try {
      const { data } = await api.post(
        `/restaurant/${selectedRestaurantId}/categories`,
        { name: menuName, image: menuImage }
      );
      setMenuCategories((prev) => [...prev, data]);
      closeAddMenu();
    } catch (err) {
      console.error(err);
      alert("Failed to add menu");
    }
  }

  function openEditMenu(cat) {
    setEditingCategory(cat);
    setMenuName(cat.name);
    setMenuImage(cat.image);
    setIsEditMenuOpen(true);
  }
  function closeEditMenu() {
    setIsEditMenuOpen(false);
  }
  async function saveEditMenu() {
    try {
      const { data } = await api.put(
        `/restaurant/${selectedRestaurantId}/categories/${editingCategory.id}`,
        { name: menuName, image: menuImage }
      );
      setMenuCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? data : c))
      );
      if (selectedCategory?.id === editingCategory.id) {
        selectCategory(data);
      }
      closeEditMenu();
    } catch (err) {
      console.error(err);
      alert("Failed to update menu");
    }
  }

  async function deleteMenu(cat) {
    
    if (!window.confirm("Delete this menu?")) return;
    try {
      await api.delete(
        `/restaurant/${selectedRestaurantId}/categories/${cat.id}`
      );
      setMenuCategories((prev) => prev.filter((c) => c.id !== cat.id));
      backToMenus();
    } catch (err) {
      console.error(err);
      alert("Failed to delete menu");
    }
  }

  
  function openAddItem() {
    setEditingItem(null);
    setItemName("");
    setItemDesc("");
    setItemPrice("");
    setItemImage("");
    setIsAddItemOpen(true);
  }
  function closeAddItem() {
    setIsAddItemOpen(false);
  }
  function onItemImageChange(e) {
    const f = e.target.files[0];
    if (!f) return setItemImage("");
    const r = new FileReader();
    r.onloadend = () => setItemImage(r.result);
    r.readAsDataURL(f);
  }
  async function saveAddItem() {
    if (!selectedCategory) return;
    try {
      const { data } = await api.post(
        `/restaurant/${selectedRestaurantId}/menu`,
        {
          name: itemName,
          description: itemDesc,
          price: parseFloat(itemPrice),
          image: itemImage,
          category: selectedCategory.id,
        }
      );
      const saved = { ...data, id: data._id };
      setAllMenuItems((prev) => [...prev, saved]);
      setMenuItemsInCategory((prev) => [...prev, saved]);
      closeAddItem();
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  }

  function openEditItem(it) {
    setEditingItem(it);
    setItemName(it.name);
    setItemDesc(it.description);
    setItemPrice(it.price);
    setItemImage(it.image);
    setIsEditItemOpen(true);
  }
  function closeEditItem() {
    setIsEditItemOpen(false);
  }
  async function saveEditItem() {
    try {
      const { data } = await api.put(
        `/restaurant/${selectedRestaurantId}/menu/${editingItem.id}`,
        {
          name: itemName,
          description: itemDesc,
          price: parseFloat(itemPrice),
          image: itemImage,
          category: selectedCategory.id,
        }
      );
      const updated = { ...data, id: data._id };
      setAllMenuItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? updated : i))
      );
      setMenuItemsInCategory((prev) =>
        prev.map((i) => (i.id === editingItem.id ? updated : i))
      );
      closeEditItem();
    } catch (err) {
      console.error(err);
      alert("Failed to update item");
    }
  }

  async function deleteItem(it) {
   
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/restaurant/${selectedRestaurantId}/menu/${it.id}`);
      setAllMenuItems((prev) => prev.filter((i) => i.id !== it.id));
      setMenuItemsInCategory((prev) => prev.filter((i) => i.id !== it.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar
        className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Manage Menu Items</h1>

            
            <RestaurantSelector
              restaurants={restaurants}
              value={selectedRestaurantId}
              onChange={handleRestaurantChange}
            />

           
            {selectedRestaurantId && !selectedCategory && (
              <CategoryList
                categories={menuCategories}
                selectedId={selectedCategory?.id}
                onSelect={selectCategory}
                onAdd={openAddMenu}
                onEdit={openEditMenu}
                onDelete={deleteMenu}
              />
            )}

            {/* 3. Menu items */}
            {selectedCategory && (
              <MenuItemsGrid
                category={selectedCategory}
                items={menuItemsInCategory}
                onBack={backToMenus}
                onAdd={openAddItem}
                onEdit={openEditItem}
                onDelete={deleteItem}
              />
            )}
          </div>
        </main>
      </div>

      {/* 4. Category modals */}
      <CategoryModal
        isOpen={isAddMenuOpen}
        onClose={closeAddMenu}
        onSave={saveAddMenu}
        name={menuName}
        setName={setMenuName}
        imagePreview={menuImage}
        onImageChange={onMenuImageChange}
        saveLabel="Save"
      />
      <CategoryModal
        isOpen={isEditMenuOpen}
        onClose={closeEditMenu}
        onSave={saveEditMenu}
        name={menuName}
        setName={setMenuName}
        imagePreview={menuImage}
        onImageChange={onMenuImageChange}
        saveLabel="Update"
      />

      
      <ItemModal
        isOpen={isAddItemOpen}
        onClose={closeAddItem}
        onSave={saveAddItem}
        name={itemName}
        setName={setItemName}
        description={itemDesc}
        setDescription={setItemDesc}
        price={itemPrice}
        setPrice={setItemPrice}
        imagePreview={itemImage}
        onImageChange={onItemImageChange}
        saveLabel="Save"
      />
      <ItemModal
        isOpen={isEditItemOpen}
        onClose={closeEditItem}
        onSave={saveEditItem}
        name={itemName}
        setName={setItemName}
        description={itemDesc}
        setDescription={setItemDesc}
        price={itemPrice}
        setPrice={setItemPrice}
        imagePreview={itemImage}
        onImageChange={onItemImageChange}
        saveLabel="Update"
      />
    </div>
  );
}
