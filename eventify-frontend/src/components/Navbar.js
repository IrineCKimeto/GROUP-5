import { Link } from "react-router-dom"
import logo from '../logo/eventify-logo.png';

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-800 px-4 py-3 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo with Text */}
                <Link to="/" className="flex items-center space-x-3">
                    <img 
                        src={logo} 
                        alt="Eventify Logo" 
                        className="h-10 w-auto"
                    />
                    <span className="text-2xl font-extrabold text-white tracking-wider">
                        Eventify
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
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center space-x-8">
                    <li>
                        <Link to="/" className="text-gray-200 hover:text-blue-400 font-medium">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" className="text-gray-200 hover:text-blue-400 font-medium">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="text-gray-200 hover:text-blue-400 font-medium">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/signin" 
                            className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;