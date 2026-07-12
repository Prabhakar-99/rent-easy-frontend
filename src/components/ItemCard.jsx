import React from "react";
import BookingForm from "./BookingForm";

function ItemCard({ item }) {
  const price = item?.price ?? 0;
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-md p-6 
                 hover:shadow-xl hover:bg-gray-100 transform hover:-translate-y-1 
                 transition duration-200 ease-in-out"
    >
      <h3 className="text-xl font-semibold text-gray-800">{item?.name || "Unnamed Item"}</h3>
      <p className="text-sm text-gray-500 mb-1">Category: {item?.category || "General"}</p>

      <p className="text-lg font-bold text-blue-600 mb-3">
        Price: ₹{price}
      </p>

      <p className={`text-sm mb-3 ${item?.availability ? "text-green-600" : "text-red-600"}`}>
        {item?.availability ? "Available" : "Not available"}
      </p>

      {/* Compact booking form */}
      <BookingForm itemId={item?._id} />
    </div>
  );
}

export default ItemCard;
