import React, { useEffect, useState } from "react";
import axios from "../services/api";
import AddItemForm from "../components/AddItemForm";

import { toast } from "react-toastify";


function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    description: "",
    pickupLocation: "",
    availability: true,
  });

  const fetchData = async () => {
    try {
      const [bookingsRes, itemsRes] = await Promise.all([
        axios.get("/bookings/all"),
        axios.get("/items"),
      ]);
      setBookings(bookingsRes.data);
      setItems(itemsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status, pickupLocation) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status, pickupLocation });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status, pickupLocation } : b))
      );
       toast.success("Booking status updated!");
    } catch (err) {
      console.error("Error updating booking:", err);
       toast.error("Failed to update booking status");
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item and all related bookings?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
      setBookings(bookings.filter((b) => b.itemId?._id !== id));
       toast.success("Item and related bookings deleted!");
    } catch (err) {
      console.error("Error deleting item:", err);
        toast.error("Failed to delete item");
    }
  };

  const startEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      name: item.name,
      category: item.category,
      description: item.description,
      pickupLocation: item.pickupLocation,
      availability: item.availability,
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditForm({
      name: "",
      category: "",
      description: "",
      pickupLocation: "",
      availability: true,
    });
  };

 
const saveEdit = async (id) => {
  try {
    const res = await axios.put(`/items/${id}`, editForm);
    setItems(items.map((item) => (item._id === id ? res.data : item)));
    cancelEdit();
    toast.success("Item updated successfully!");
  } catch (err) {
    console.error("Error updating item:", err);
    toast.error("Failed to update item");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Bookings Section */}
      <h3 className="text-xl font-semibold mb-2">Manage Bookings</h3>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User</th>
            <th className="p-2">Item</th>
            <th className="p-2">Dates</th>
            <th className="p-2">Status</th>
            <th className="p-2">Pickup Location</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-t">
              <td className="p-2">{b.userId?.name}</td>
              <td className="p-2">{b.itemId?.name}</td>
              <td className="p-2">{b.startDate} → {b.endDate}</td>
              <td className="p-2">{b.status}</td>
              <td className="p-2">{b.pickupLocation || "-"}</td>
              <td className="p-2">
                <button
                  onClick={() =>
                    updateStatus(b._id, "confirmed", b.itemId?.pickupLocation)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Items Section */}
      <h3 className="text-xl font-semibold mb-2">Manage Items</h3>
      <AddItemForm onItemAdded={fetchData} />

      <ul className="space-y-2 mt-4">
        {items.map((item) => (
          <li key={item._id} className="border p-2 rounded">
            {editingItem === item._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editForm.pickupLocation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, pickupLocation: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editForm.availability}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        availability: e.target.checked,
                      })
                    }
                  />
                  Available
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(item._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>
                  {item.name} ({item.category}) - {item.description} | Pickup:{" "}
                  {item.pickupLocation}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
