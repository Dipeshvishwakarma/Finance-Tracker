import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Header = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-700 hover:text-gray-800 transition duration-200"
        >
          Finance Tracker
        </Link>

        <div className="flex items-center space-x-6">

          {accessToken && (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition duration-200"
              >
                Dashboard
              </Link>
            </>
          )}
          {accessToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-400 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-400 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
