import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Events from "./pages/Events"
import AboutUs from "./pages/AboutUs"
import Support from './pages/support';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from "./pages/UserProfile";
import AdminEvents from './pages/AdminEvents';
import AdminTickets from './pages/AdminTickets';
import TicketPage from "./pages/TicketPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin/events" element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            } />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin/tickets" element={<AdminTickets />} />
            <Route path="/tickets" element={<TicketPage />} />

            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
