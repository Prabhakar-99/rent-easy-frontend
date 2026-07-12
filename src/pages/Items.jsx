import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import ItemCard from '../components/ItemCard';
import AddItemForm from '../components/AddItemForm';

function Items() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Items</h2>

      {/* Add Item Form */}
      <div className="mb-8">
        <AddItemForm onItemAdded={fetchItems} />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Items;
