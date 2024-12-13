import React, { useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLocationHome = location.pathname === "/";
  const navigate = useNavigate();

  return (
    <header className="m-2">
      <nav className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
        {/* Logo */}
        <div className="font-semibold text-2xl font-[Poppins]">
          <h1>Asset Management System</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          <a href="#" className="hover:text-blue-500 px-4 py-2">
            Assets
          </a>
          <a href="#" className="hover:text-blue-500 px-4 py-2">
            Dashboard
          </a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400" onClick={()=>{
            navigate("/login")
          }}>
            Login
          </button>
          {!isLocationHome ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400">
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
