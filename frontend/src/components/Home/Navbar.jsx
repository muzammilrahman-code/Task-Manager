import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(authAction.logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="flex justify-between items-center h-16 w-full">
          
          {/* Left side - Logo / App name */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            TaskFlow
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-8 ml-auto">
            <Link
              to="/"
              className="hover:text-blue-400 transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="hover:text-blue-400 transition-all duration-200 flex items-center gap-1"
            >
              <FaUserCircle className="text-xl" />
              Profile
            </Link>
            <button
              onClick={logoutHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md font-medium transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center ml-auto">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col items-start px-4 py-3 space-y-3">
            <Link
              to="/"
              className="w-full hover:bg-gray-700 rounded px-2 py-2 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="w-full hover:bg-gray-700 rounded px-2 py-2 transition-all flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCircle /> Profile
            </Link>
            <button
              onClick={() => {
                logoutHandler();
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
