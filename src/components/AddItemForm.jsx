import React, { useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";

function AddItemForm({ onItemAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const [pickupLocation, setPickupLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("Please enter a valid non-negative price");
      return;
    }
//console.log({ name, category, description, price: parsedPrice, availability, pickupLocation });

    try {
      await axios.post("/items", {
        name,
        category,
        description,
        price: parsedPrice,
        availability,
        pickupLocation,
      });

      toast.success("Item added successfully!");
      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setAvailability(true);
      setPickupLocation("");
      if (onItemAdded) onItemAdded();
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      toast.error("Failed to add item");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Item</h3>

      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <input
        type="text"
        placeholder="Category (e.g. book, gadget, chair)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <input
        type="number"
        placeholder="Price (₹)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        step="0.01"
        min="0"
        required
      />

      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
        />
        Available
      </label>

      <input
        type="text"
        placeholder="Pickup Location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
      >
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
