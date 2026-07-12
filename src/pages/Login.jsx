import React, { useState } from "react";
import axios from "../services/api";
import loginImg from "../assets/login.png"; //  image of  left side 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });

      // Save token, role, and username in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("username", res.data.user.name);

      alert("Login successful!");
      window.location.href = "/bookings";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with image */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src={loginImg}
          alt="Login Banner"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Right side with card */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 
                     transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <h2 className="text-3xl font-bold mb-2 text-blue-600 text-center">
            Welcome Back to
          </h2>
          <h2 className="text-3xl font-bold mb-2 text-blue-600 text-center">
            RentEasy
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Sign in to manage your rentals.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label htmlFor="email" className="text-gray-600 mb-0 font-bold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-gray-600 mb-0 font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded font-semibold 
                         hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
