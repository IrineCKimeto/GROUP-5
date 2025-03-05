import React, { useState, useEffect } from 'react';
import EventDetailsModal from '../components/EventDetailsModal';
import CartSidebar from '../components/CartSideBar';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://group-5-new.onrender.com/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEventsData(data);
      setError(null);
    } catch (err) {
      setError('Error loading events. Please try again later.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = eventsData.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? event.category === selectedCategory : true) &&
      (selectedDateRange ? event.date.includes(selectedDateRange) : true) &&
      (selectedLocation ? event.location === selectedLocation : true)
    );
  });

  const handleAddToCart = (event) => {
    const existingItem = cartItems.find((item) => item.id === event.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...event, quantity: 1 }]);
    }
    setSidebarOpen(true);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Implement checkout logic here
    console.log('Checking out with items:', cartItems);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Hero Section */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          alt="Events Cover"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-75"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
            Discover Amazing Events
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            Find and book the best events in Kenya
          </p>
          {/* Search and Filter */}
          <div className="mt-6 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Categories</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Art & Culture">Art & Culture</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
            </select>
            <input
              type="date"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Locations</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Kisumu">Kisumu</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Events Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {searchTerm || selectedCategory ? 'Search Results' : 'All Events'}
            </h2>
            {loading ? (
              <div className="text-center py-10">Loading events...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                  >
                    <img
                      src={event.image || 'https://via.placeholder.com/400x200'}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                        {event.description}
                      </p>
                      <div className="text-sm text-gray-500 mb-2">
                        <p>
                          <span className="font-medium">Location:</span>{' '}
                          {event.location}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{' '}
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Tickets:</span>{' '}
                          {event.available_tickets}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-blue-600 font-bold text-lg">
                          KES {event.ticket_price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(event)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Categories Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex justify-between items-center">
                Popular Categories
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-500 focus:outline-none"
                >
                  {sidebarOpen ? '-' : '+'}
                </button>
              </h2>
              {sidebarOpen && (
                <div className="space-y-4">
                  {['Music', 'Technology', 'Food & Drinks', 'Art & Culture', 'Sports', 'Business'].map(
                    (category, index) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
                          selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-xl">
                            {['🎵', '💻', '🍷', '🎨', '🏃', '💼'][index]}
                          </span>
                          <div>
                            <div className="font-semibold">{category}</div>
                            <div className="text-sm opacity-75">
                              {
                                filteredEvents.filter((e) => e.category === category)
                                  .length
                              }{' '}
                              events
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* The CartSidebar component includes a fixed floating button at the bottom-right */}
      <CartSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default Events;
