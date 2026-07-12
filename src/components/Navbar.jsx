import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../assets/avatar.png";

function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const THRESHOLD = 30;
  const MIN_HIDE_SCROLL = 80;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  useEffect(() => {
    lastScrollY.current = window.scrollY || 0;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastScrollY.current;

        if (delta > THRESHOLD && currentY > MIN_HIDE_SCROLL) {
          setVisible(false);
        } else if (delta < -THRESHOLD) {
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
          bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md`}
      >
        {/* Left: Brand Name */}
        <h2 className="font-bold text-2xl tracking-wide">RentEasy</h2>

        {/* Middle: Nav Links */}
        <ul className="flex gap-6 items-center">
          <li>
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/items" className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
              Items
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
              My Bookings
            </Link>
          </li>

          {role === "admin" && (
            <li>
              <Link to="/admin" className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Admin Dashboard
              </Link>
            </li>
          )}

          {!token ? (
            <>
              <li>
                <Link to="/login" className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Right: User Profile */}
        {token && (
          <div className="flex items-center gap-3">
            <span className="font-medium">{username || "Guest"}</span>
            <img
              src={avatarImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        )}
      </nav>

    
      <div aria-hidden="true" className="h-16" />
    </>
  );
}

export default Navbar;
