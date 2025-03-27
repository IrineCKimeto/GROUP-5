import React, { useState, useEffect } from 'react';

function TicketPage() {
  const [eventsData, setEventsData] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');
  const [userTickets, setUserTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://group-5-new.onrender.com/events'); // Fetch events

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEventsData(data);

      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Could not load events. Please try again later.');
      }
    };

    const fetchUserTickets = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://group-5-new.onrender.com/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user tickets');
        }
        const tickets = await response.json();
        setUserTickets(tickets);
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      }
    };

    fetchEvents();
    fetchUserTickets();
  }, []);

  const handleBookTicket = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://group-5-new.onrender.com/tickets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ event_id: selectedEvent })
      });

      if (!response.ok) {
        throw new Error('Failed to book ticket');
      }

      alert('Ticket booked successfully!');
      // Refresh user tickets after booking
      const updatedTicketsResponse = await fetch('https://group-5-new.onrender.com/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const updatedTickets = await updatedTicketsResponse.json();
      setUserTickets(updatedTickets);
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Failed to book ticket. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Ticket Bookings</h1>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Available Events</h2>
          <select 
            value={selectedEvent} 
            onChange={(e) => setSelectedEvent(e.target.value)} 
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an event</option>
            {eventsData.map(event => (

              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
          <button 
            onClick={handleBookTicket} 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Book Ticket
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Your Booked Tickets</h2> {/* This can be removed if redundant */}

          <ul className="mt-2">
            {userTickets.map(ticket => (
              <li key={ticket.id} className="border-b py-2">
                Ticket for Event ID: {ticket.event_id} - Status: {ticket.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TicketPage;
