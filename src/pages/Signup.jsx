import React, { useState } from "react";
import axios from "../services/api";
import signupImg from "../assets/signup.png"; // background image

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", { name, email, password });
      alert("Signup successful!");
      window.location.href = "/login"; // redirect to login after signup
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side background image */}
      <div className="hidden md:flex w-1/2">
        <img
          src={signupImg}
          alt="Signup Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side signup card */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 
                     transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {/* Vertical stacked heading */}
          <h2 className="text-3xl font-bold text-green-600 text-center mb-2">
            Sign up to
          </h2>
          <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
            RentEasy
          </h2>

          {/* Signup form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <label htmlFor="name" className="text-gray-600 font-bold">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Your Name"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className="text-gray-600 font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-gray-600 font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded font-semibold 
                         hover:bg-green-700 transition duration-200"
            >
              Signup
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
