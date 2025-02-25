import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../logo/eventify-logo.png";
import NotificationsIcon from "./NotificationsIcon";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();
    window.addEventListener("userUpdated", updateUser);

    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/signin");
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 px-4 py-3 z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo with Text */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <img src={logo} alt="Eventify Logo" className="h-10 w-auto relative" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-wider relative">
            Eventify
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"></div>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-96 mx-4">
          <input
            type="text"
            placeholder="Search Eventify"
            className="w-full px-4 py-2 rounded-full border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={user?.role === "admin" ? "/admin/events" : "/events"}
              className="text-gray-200 hover:text-cyan-400 font-medium transition-colors"
            >
              {user?.role === "admin" ? "Admin Events" : "Events"}
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/support" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors">
              Support
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors">
              Profile
            </Link>
          </li>
          <li>
            <NotificationsIcon />
          </li>
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link to="/signin" className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors duration-200">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

