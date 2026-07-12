import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm({ itemId }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get(`/bookings/item/${itemId}`);
        // Backend returns array of { startDate, endDate }
        const dates = res.data.flatMap((b) =>
          getDatesBetween(new Date(b.startDate), new Date(b.endDate))
        );
        setBookedDates(dates);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookedDates();
  }, [itemId]);

  // Expand date ranges into individual days
  const getDatesBetween = (start, end) => {
    const dates = [];
    let current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/bookings", { itemId, startDate, endDate });
      toast.success("Booking confirmed!");
      setStartDate(null);
      setEndDate(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book item");
    }
  };

  return (
    <form onSubmit={handleBooking} className="flex flex-col gap-3 mt-3">
      <label className="font-bold text-gray-700">Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        highlightDates={[{ "react-datepicker__day--highlighted-red": bookedDates }]}
        excludeDates={bookedDates} // disable booked dates
        minDate={new Date()}
        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
        required
      />

      <label className="font-bold text-gray-700">End Date</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        highlightDates={[{ "react-datepicker__day--highlighted-red": bookedDates }]}
        excludeDates={bookedDates} // disable booked dates
        minDate={startDate || new Date()}
        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
      >
        Book
      </button>
    </form>
  );
}

export default BookingForm;
