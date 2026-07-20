import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../assets/avatar.png";

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false); // ✅ mobile menu toggle
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

  // Helper to close menu after navigation
  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
          bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md`}
      >
        {/* Left: Brand Name */}
        <h2 className="font-bold text-2xl tracking-wide">RentEasy</h2>

        {/* Hamburger button (mobile only) */}
        <button
          className="lg:hidden block text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Middle: Nav Links */}
        <ul
          className={`lg:flex lg:gap-6 lg:items-center absolute lg:static bg-blue-600 w-full left-0 lg:w-auto transition-all duration-300 ${
            open ? "top-16" : "top-[-400px]"
          }`}
        >
          <li>
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 hover:bg-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/items" onClick={closeMenu} className="block px-3 py-2 hover:bg-blue-700">
              Items
            </Link>
          </li>
          <li>
            <Link to="/bookings" onClick={closeMenu} className="block px-3 py-2 hover:bg-blue-700">
              My Bookings
            </Link>
          </li>

          {role === "admin" && (
            <li>
              <Link to="/admin" onClick={closeMenu} className="block px-3 py-2 hover:bg-blue-700">
                Admin Dashboard
              </Link>
            </li>
          )}

          {!token ? (
            <>
              <li>
                <Link to="/login" onClick={closeMenu} className="block px-3 py-2 hover:bg-blue-700">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={closeMenu} className="block px-3 py-2 hover:bg-blue-700">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block px-3 py-2 hover:bg-blue-700"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Right: User Profile (desktop only) */}
        {token && (
          <div className="hidden lg:flex items-center gap-3">
            <span className="font-medium">{username || "Guest"}</span>
            <img
              src={avatarImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump */}
      <div aria-hidden="true" className="h-16" />
    </>
  );
}

export default Navbar;
