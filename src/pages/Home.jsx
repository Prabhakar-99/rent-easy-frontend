import React, { useEffect, useState } from "react";
import axios from "../services/api";
import ItemCard from "../components/ItemCard";
import bannerImg from "../assets/HomepageBanner1.png";

import bookImg from "../assets/book.png";
import gadgetImg from "../assets/gadget.png";
import hostelImg from "../assets/hostel.png";



function Home() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(null);

  const fetchItems = async (selectedCategory = null) => {
    try {
      const res = await axios.get("/items");
      let data = res.data;

      if (selectedCategory) {
        data = data.filter((item) =>
          item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      } else {
        data = data.slice(0, 6); // default featured items
      }

      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    fetchItems(cat);
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full mt-0">
        <img
          src={bannerImg}
          alt="RentEasy Banner"
          className="w-full max-h-[400px] md:max-h-[500px] object-contain md:object-cover object-center"
        />
      </div>


      {/* Categories Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
          <button
            onClick={() => handleCategoryClick("book")}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 
           flex flex-col justify-between text-center cursor-pointer
           transition duration-300 ease-in-out 
           hover:shadow-xl hover:bg-gray-100 hover:-translate-y-1"

          >
            <img src={bookImg} alt="Books" className="w-20 h-20 mx-auto mb-4 rounded-lg shadow-sm" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Textbooks & Study Material</h3>
              <p className="text-sm text-gray-600">Rent books, notes, and study guides</p>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-blue-700">
                View
              </span>
            </div>
          </button>

          <button
            onClick={() => handleCategoryClick("gadget")}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 
           flex flex-col justify-between text-center cursor-pointer
           transition duration-300 ease-in-out 
           hover:shadow-xl hover:bg-gray-100 hover:-translate-y-1"
          >
            <img src={gadgetImg} alt="Electronics" className="w-20 h-20 mx-auto mb-4 rounded-lg shadow-sm" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Electronics & Gadgets</h3>
              <p className="text-sm text-gray-600">Laptops, projectors, headphones, and more</p>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-blue-700">
                View
              </span>
            </div>
          </button>

          <button
            onClick={() => handleCategoryClick("hostel")}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 
           flex flex-col justify-between text-center cursor-pointer
           transition duration-300 ease-in-out 
           hover:shadow-xl hover:bg-gray-100 hover:-translate-y-1"

          >
            <img src={hostelImg} alt="Hostel Essentials" className="w-20 h-20 mx-auto mb-4 rounded-lg shadow-sm" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Hostel & Dorm Essentials</h3>
              <p className="text-sm text-gray-600">Furniture, appliances, and daily needs</p>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-blue-700">
                View
              </span>
            </div>
          </button>
        </div>
      </div>


      {/* Featured / Filtered Listings */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3 group">
          {category ? (
            <>
              {category === "book" && (
                <>
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    Textbooks & Study Material
                  </span>
                  <img
                    src={bookImg}
                    alt="Books"
                    className="w-8 h-8 rounded-md transition-transform duration-200 group-hover:scale-110"
                  />
                </>
              )}
              {category === "gadget" && (
                <>
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    Electronics & Gadgets
                  </span>
                  <img
                    src={gadgetImg}
                    alt="Gadgets"
                    className="w-8 h-8 rounded-md transition-transform duration-200 group-hover:scale-110"
                  />
                </>
              )}
              {category === "hostel" && (
                <>
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    Hostel & Dorm Essentials
                  </span>
                  <img
                    src={hostelImg}
                    alt="Hostel"
                    className="w-8 h-8 rounded-md transition-transform duration-200 group-hover:scale-110"
                  />
                </>
              )}
            </>
          ) : (
            "Featured Listings"
          )}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => <ItemCard key={item._id} item={item} />)
          ) : (
            <p className="text-gray-600">No items found in this category.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;
