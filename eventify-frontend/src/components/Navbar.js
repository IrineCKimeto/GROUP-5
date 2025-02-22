import { Link } from "react-router-dom"
import logo from '../logo/eventify-logo.png';

function Navbar() {
    return (
        <nav className="bg-gray-800 px-4 py-3">
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