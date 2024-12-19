import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import { AssetContext } from "../context/AssetContext"; // Correct path to your AssetContext

const Navbar = () => {
  // const [role, setRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  // const { token, setToken } = useContext(AssetContext);

  // Fetch token from localStorage when component mounts
  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   if (savedToken) {
  //     setToken(savedToken); // Set the token from localStorage if it exists
  //   }
  // }, [setToken]);

  // // Decode token and set the role when the token changes
  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token); // Decode the token to get the role
  //       if (decodedToken?.role) {
  //         setRole(decodedToken.role); // Set role from the decoded token
  //       } else {
  //         console.warn("Role not found in token");
  //         setRole(null);
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //       setRole(null); // Reset role in case of decoding errors
  //     }
  //   } else {
  //     setRole(null); // Reset role when token is cleared
  //   }
  // }, [token]);

  // const handleLogout = () => {
  //   setToken(null); // Clear token from context
  //   localStorage.removeItem("token"); // Remove token from localStorage
  //   setRole(null); // Reset role state
  //   navigate("/"); // Navigate to the login page
  // };

  const { token, role, handleLogout } = useContext(AssetContext);
  // const navigateToDashboard = () => {
  //   if (role === "ADMIN" && token) {
  //     navigate("/dashboard"); // Admin dashboard
  //   } else if (role === "USER" && token) {
  //     navigate("/userDashboard"); // User dashboard
  //   } else {
  //     console.warn("Role not found or token missing");
  //     navigate("/login"); // Navigate to login if no role is found or token is missing
  //   }
  // };
  useEffect(() => {
    console.log("Token in Navbar:", token);
    console.log("Role in Navbar:", role);
  }, [token, role]);
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
          
          {
            // Show Add Asset button only if role is ADMIN and token exists
            role === "ADMIN" && token && (
              <button
                className="hover:text-blue-500 px-4 py-2"
                onClick={() => {
                  navigate("/add-asset");
                }}
              >
                Add Asset
              </button>
            )
          }
          {
            // Show Login button if token is not present, else show Logout button
            !token ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            )
          }
        </div>

        {/* Mobile Menu Toggle */}
      </nav>
    </header>
  );
};

export default Navbar;
