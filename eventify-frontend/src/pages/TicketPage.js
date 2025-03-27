import React, { useState, useEffect } from 'react';

function TicketPage() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [userTickets, setUserTickets] = useState([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://group-5-new.onrender.com/events');
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
        
        // Enrich tickets with event details
        const enrichedTickets = await Promise.all(tickets.map(async (ticket) => {
          const eventResponse = await fetch(`https://group-5-new.onrender.com/events/${ticket.event_id}`);
          const eventDetails = await eventResponse.json();
          return {
            ...ticket,
            event_title: eventDetails.title,
            event_date: eventDetails.date,
            event_location: eventDetails.location
          };
        }));

        setUserTickets(enrichedTickets);
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

      setNotification({
        type: 'success',
        message: 'Ticket booked successfully! Proceed with payment.'
      });

      // Refresh user tickets after booking
      const updatedTicketsResponse = await fetch('https://group-5-new.onrender.com/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const updatedTickets = await updatedTicketsResponse.json();
      
      // Enrich tickets with event details
      const enrichedTickets = await Promise.all(updatedTickets.map(async (ticket) => {
        const eventResponse = await fetch(`https://group-5-new.onrender.com/events/${ticket.event_id}`);
        const eventDetails = await eventResponse.json();
        return {
          ...ticket,
          event_title: eventDetails.title,
          event_date: eventDetails.date,
          event_location: eventDetails.location
        };
      }));

      setUserTickets(enrichedTickets);
    } catch (error) {
      console.error('Error booking ticket:', error);
      setNotification({
        type: 'error',
        message: 'Failed to book ticket. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {notification && (
          <div className={`mb-4 p-4 rounded ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {notification.message}
          </div>
        )}

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
              <option key={event.id} value={event.id}>
                {event.title} - Date: {new Date(event.date).toLocaleDateString()}
              </option>
            ))}
          </select>
          <button 
            onClick={handleBookTicket} 
            disabled={!selectedEvent}
            className={`mt-4 px-6 py-2 rounded-lg transition-colors ${
              selectedEvent 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Book Ticket
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Booked Tickets</h2>
          {userTickets.length === 0 ? (
            <p className="text-gray-600">No tickets booked yet.</p>
          ) : (
            <ul className="space-y-4">
              {userTickets.map(ticket => (
                <li 
                  key={ticket.id} 
                  className={`border rounded-lg p-4 ${
                    ticket.status === 'paid' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{ticket.event_title}</h3>
                      <p className="text-gray-600">
                        Date: {new Date(ticket.event_date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        Location: {ticket.event_location}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.status === 'paid' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {ticket.status === 'paid' ? 'Paid' : 'Pending Payment'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketPage;