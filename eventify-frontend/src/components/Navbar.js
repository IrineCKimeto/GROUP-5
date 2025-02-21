import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="bg-gray-800 px-4 py-3">
            <div className="max-w-7xl mx-auto">
                <ul className="flex justify-center space-x-8">
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
                        <Link to="/signin" className="text-gray-200 hover:text-blue-400 font-medium">
                            Sign In
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;