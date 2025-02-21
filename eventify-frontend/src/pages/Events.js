import React, { useState } from 'react';

const eventsData = [
  {
    id: 1,
    title: 'Music Concert',
    description: 'A great music concert featuring top artists.',
    date: '2025-03-15',
    location: 'Nairobi, Kenya',
    category: 'Music',
    featured: true,
  },
  {
    id: 2,
    title: 'Tech Conference',
    description: 'A conference showcasing the latest in technology.',
    date: '2025-04-20',
    location: 'Mombasa, Kenya',
    category: 'Technology',
    featured: false,
  },
  
];

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredEvents = eventsData.filter(event => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? event.category === selectedCategory : true) &&
      (selectedDateRange ? event.date === selectedDateRange : true) &&
      (selectedLocation ? event.location === selectedLocation : true)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search Event"
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            
          </select>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-gray-100 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <button className="text-blue-500 hover:underline">View Details</button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Events</h2>
          {filteredEvents.filter(event => event.featured).map(event => (
            <div key={event.id} className="bg-gray-100 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <button className="text-blue-500 hover:underline">View Details</button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Categories</h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">Music</h3>
            <button className="text-blue-500 hover:underline">View Events</button>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">Technology</h3>
            <button className="text-blue-500 hover:underline">View Events</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;