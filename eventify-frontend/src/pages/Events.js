import React, { useState } from 'react';
import EventDetailsModal from '../components/EventDetailsModal';

const eventsData = [
  {
    id: 1,
    title: 'Music Concert',
    description: 'A great music concert featuring top Kenyan artists including Sauti Sol and Nyashinski.',
    date: '2025-03-15',
    location: 'KICC, Nairobi',
    category: 'Music',
    featured: true,
    price: 2500,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Tech Conference 2025',
    description: 'Annual tech conference showcasing the latest innovations in AI, blockchain, and cloud computing.',
    date: '2025-04-20',
    location: 'Sarit Centre, Nairobi',
    category: 'Technology',
    featured: false,
    price: 3000,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Food & Wine Festival',
    description: 'Experience the best of Kenyan cuisine and international wines.',
    date: '2025-05-10',
    location: 'Carnivore Gardens, Nairobi',
    category: 'Food & Drinks',
    featured: true,
    price: 4000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    title: 'Art Exhibition',
    description: 'Showcasing contemporary African art from emerging artists.',
    date: '2025-06-01',
    location: 'National Museums of Kenya, Nairobi',
    category: 'Art & Culture',
    featured: false,
    price: 1500,
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 5,
    title: 'Marathon for Charity',
    description: 'Annual marathon supporting education initiatives in Kenya.',
    date: '2025-07-15',
    location: 'Ngong Road, Nairobi',
    category: 'Sports',
    featured: true,
    price: 2000,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 6,
    title: 'Business Summit',
    description: 'Connecting entrepreneurs and investors in East Africa.',
    date: '2025-08-20',
    location: 'Radisson Blu, Nairobi',
    category: 'Business',
    featured: false,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = eventsData.filter(event => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? event.category === selectedCategory : true) &&
      (selectedDateRange ? event.date === selectedDateRange : true) &&
      (selectedLocation ? event.location === selectedLocation : true)
    );
  });

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
          {/* Events Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchTerm || selectedCategory ? 'Search Results' : 'All Events'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold">KES {event.price.toLocaleString()}</span>
                      <button 
                        onClick={() => setSelectedEvent(event)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Categories</h2>
              <div className="space-y-4">
                {['Music', 'Technology', 'Food & Drinks', 'Art & Culture', 'Sports', 'Business'].map((category, index) => (
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
                          {filteredEvents.filter(e => e.category === category).length} events
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
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
    </div>
  );
}

export default Events;