// src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../logo/eventify-logo.png";
import NotificationsIcon from "./NotificationsIcon";

function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 px-4 py-3 z-50">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-200 hover:text-cyan-400"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Search Bar - Hidden on Mobile */}
        <div className="hidden md:block relative w-96 mx-4">
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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
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
          {/* Move Profile and Notifications to appear only for logged in users */}
          {user ? (
            <>
              <li>
                <Link to="/profile" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <NotificationsIcon />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin" className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors duration-200">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu - Slide Down */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 shadow-lg absolute left-0 right-0 z-50">
          {/* Mobile Search */}
          <div className="mb-4 relative">
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
          
          <ul className="flex flex-col space-y-3">
            <li>
              <Link to="/" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors block py-2">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={user?.role === "admin" ? "/admin/events" : "/events"}
                className="text-gray-200 hover:text-cyan-400 font-medium transition-colors block py-2"
              >
                {user?.role === "admin" ? "Admin Events" : "Events"}
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors block py-2">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/support" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors block py-2">
                Support
              </Link>
            </li>
            {/* Mobile Profile and Notifications - Only show when logged in */}
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors block py-2">
                    Profile
                  </Link>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <span className="text-gray-200 mr-2">Notifications</span>
                    <NotificationsIcon />
                  </div>
                </li>
                <li className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="py-2">
                <Link to="/signin" className="w-full block text-center px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors duration-200">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;