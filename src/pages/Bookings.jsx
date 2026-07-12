import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";
import {
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  ArrowUturnLeftIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const role = localStorage.getItem("role");
      const endpoint = role === "admin" ? "/bookings/all" : "/bookings";
      const res = await axios.get(endpoint);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Admin status update (existing)
  const updateStatus = async (id, status, pickupLocation = "") => {
    try {
      await axios.put(`/bookings/${id}/status`, { status, pickupLocation });
      await fetchBookings();
      toast.success("Booking status updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking status");
    }
  };

  // New workflow actions
  const markPickedUp = async (id) => {
    try {
      await axios.put(`/bookings/${id}/pickup`);
      await fetchBookings();
      toast.success("Booking marked as picked up!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to mark pickup");
    }
  };

  const markReturned = async (id) => {
    try {
      await axios.put(`/bookings/${id}/return`);
      await fetchBookings();
      toast.success("Booking marked as returned!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to mark return");
    }
  };

  const completeBooking = async (id) => {
    try {
      await axios.put(`/bookings/${id}/complete`);
      await fetchBookings();
      toast.success("Booking completed successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to complete booking");
    }
  };

  // Demo payment: mark booking as paid
  const markPaid = async (id) => {
    try {
      await axios.put(`/bookings/${id}/pay`, { paymentMethod: "offline" });
      await fetchBookings();
      toast.success("Payment recorded (demo)");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to record payment");
    }
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.put(`/bookings/${id}/cancel`);
      await fetchBookings();
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const renderStatusBadge = (status) => {
    let badgeClass = "";
    switch (status) {
      case "confirmed":
        badgeClass = "bg-green-100 text-green-700";
        break;
      case "picked_up":
        badgeClass = "bg-blue-100 text-blue-700";
        break;
      case "returned":
        badgeClass = "bg-yellow-100 text-yellow-700";
        break;
      case "completed":
        badgeClass = "bg-gray-100 text-gray-700";
        break;
      case "cancelled":
        badgeClass = "bg-red-100 text-red-700";
        break;
      default:
        badgeClass = "bg-yellow-100 text-yellow-700";
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
        {status}
      </span>
    );
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircleIcon className="h-5 w-5 text-green-600 inline-block mr-1" />;
      case "picked_up":
        return <TruckIcon className="h-5 w-5 text-blue-600 inline-block mr-1" />;
      case "returned":
        return <ArrowUturnLeftIcon className="h-5 w-5 text-yellow-600 inline-block mr-1" />;
      case "completed":
        return <CheckBadgeIcon className="h-5 w-5 text-gray-600 inline-block mr-1" />;
      case "cancelled":
        return <XCircleIcon className="h-5 w-5 text-red-600 inline-block mr-1" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-600 inline-block mr-1" />;
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const roleIsAdmin = localStorage.getItem("role") === "admin";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        {roleIsAdmin ? "All Bookings" : "Your Bookings"}
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">📭 No bookings found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="bg-blue-50 rounded-md px-4 py-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.itemId?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{booking.itemId?.category}</p>
              </div>

              {/* Item Info */}
              <div>
                <p className="text-sm text-gray-600 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                  From: <span className="font-medium ml-1">{formatDate(booking.startDate)}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                  To: <span className="font-medium ml-1">{formatDate(booking.endDate)}</span>
                </p>

                {/* Amount & Payment Status */}
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Amount:</span>{" "}
                  <span className="text-blue-600 font-semibold">₹{booking.amount ?? booking.itemId?.price ?? 0}</span>
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Payment:</span>{" "}
                  <span className={booking.paymentStatus === "paid" ? "text-green-600 font-semibold" : "text-orange-600 font-semibold"}>
                    {booking.paymentStatus ?? "pending"}
                  </span>
                </p>

                <p className="mt-2 text-sm flex items-center gap-2">
                  {renderStatusIcon(booking.status)}
                  {renderStatusBadge(booking.status)}
                </p>
              </div>

              {/* Admin Controls */}
              {roleIsAdmin ? (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">User: {booking.userId?.email || booking.userId?._id}</p>

                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(booking._id, e.target.value, booking.pickupLocation)
                    }
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {booking.status === "confirmed" && (
                    <input
                      type="text"
                      placeholder="Pickup Location"
                      defaultValue={booking.pickupLocation || ""}
                      onBlur={(e) =>
                        updateStatus(booking._id, "confirmed", e.target.value)
                      }
                      className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                    />
                  )}

                  {/* Admin can complete after returned */}
                  {booking.status === "returned" && (
                    <button
                      onClick={() => completeBooking(booking._id)}
                      className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 w-full"
                    >
                      Complete Booking
                    </button>
                  )}

                  {/* Admin can mark payment as paid (demo) */}
                  {booking.paymentStatus !== "paid" && (
                    <button
                      onClick={() => markPaid(booking._id)}
                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
                    >
                      Mark Paid (Demo)
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  {/* User actions */}
                  {booking.status === "confirmed" && booking.paymentStatus !== "paid" && (
                    <button
                      onClick={() => markPaid(booking._id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
                    >
                      Pay on Pickup (Demo)
                    </button>
                  )}

                  {booking.status === "confirmed" && booking.paymentStatus === "paid" && (
                    <div className="text-sm text-green-700 font-medium">Payment received</div>
                  )}

                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => markPickedUp(booking._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 w-full"
                    >
                      Mark as Received
                    </button>
                  )}

                  {booking.status === "picked_up" && (
                    <button
                      onClick={() => markReturned(booking._id)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 w-full"
                    >
                      Mark as Returned
                    </button>
                  )}

                  {booking.status === "pending" && booking.status !== "cancelled" && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 w-full"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              )}

              {/* Pickup Location */}
              {booking.status === "confirmed" && booking.pickupLocation && (
                <p className="mt-3 text-sm text-gray-600 flex items-center">
                  <MapPinIcon className="h-5 w-5 text-green-500 mr-2" />
                  Pickup at: <span className="font-medium ml-1">{booking.pickupLocation}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
