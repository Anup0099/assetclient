import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AssetContext } from "../context/AssetContext"; // Correct path to your AssetContext

const Navbar = () => {
  const [role, setRole] = useState(null);
  const location = useLocation();
  const isLocationHome = location.pathname === "/";
  const navigate = useNavigate();
  const { token, setToken } = useContext(AssetContext); // Access token from context and setToken

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token to get the role
        if (decodedToken?.role) {
          setRole(decodedToken.role); // Set role from the decoded token
        } else {
          console.warn("Role not found in token");
          setRole(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]); // Only rerun effect when the token changes

  const handleLogout = () => {
    // Clear token from context and localStorage
    setToken(null); // Update token in context
    localStorage.removeItem("token"); // Optionally clear from localStorage as well
    navigate("/"); // Navigate to the login page
  };

  return (
    <header className="m-2">
      <nav className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
        {/* Logo */}
        <div className="font-semibold text-2xl font-[Poppins]">
          <h1>Asset Management System</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          <a href="/home" className="hover:text-blue-500 px-4 py-2">
            Assets
          </a>
          <button
            className="hover:text-blue-500 px-4 py-2"
            onClick={() => {
              // Navigate to the appropriate dashboard based on role
              if (role === "ADMIN") {
                navigate("/dashboard"); // Admin dashboard
              } else if (role === "USER") {
                navigate("/userDashboard"); // User dashboard
              } else {
                console.warn("Role not found");
                navigate("/login"); // Navigate to login if no role is found
              }
            }}
          >
            Dashboard
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          {!isLocationHome ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>

        {/* Mobile Menu Toggle */}
      </nav>
    </header>
  );
};

export default Navbar;
