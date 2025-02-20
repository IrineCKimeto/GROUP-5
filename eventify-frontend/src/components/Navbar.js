import { Link } from "react-router-dom"
function Navbar (){
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar