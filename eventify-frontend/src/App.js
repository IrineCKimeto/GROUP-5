import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Events from "./pages/Events"
import AboutUs from "./pages/AboutUs"
import Support from './pages/support';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from "./pages/UserProfile";
import AdminEvents from './pages/AdminEvents';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<UserProfile />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
