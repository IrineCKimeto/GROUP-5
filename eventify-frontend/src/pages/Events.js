import React, { useState, useEffect } from 'react';
import EventDetailsModal from '../components/EventDetailsModal';
import CartSidebar from '../components/CartSideBar';

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
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
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Checking out with items:', cartItems);
  };

  if (loading) {
    return <div className="text-center py-10">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            alt="Events Cover"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-center text-gray-300 mb-8">
            Find and book the best events in Kenya
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 text-gray-900"
            />
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 text-gray-900"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 text-gray-900"
            />
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 text-gray-900"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Kisumu">Kisumu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchTerm || selectedCategory ? 'Search Results' : 'All Events'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <div className="text-sm text-gray-500 space-y-2">
                      <p>
                        <span className="font-semibold">Location:</span> {event.location}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-semibold">Available Tickets:</span> {event.available_tickets}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-600 font-bold">
                        KES {event.ticket_price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(event)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex justify-between items-center">
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
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
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
                                filteredEvents.filter(
                                  (e) => e.category === category
                                ).length
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
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <CartSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setCartItems([]);
          setSidebarOpen(false);
        }}
      />
    </div>
  );
}

export default Events;
