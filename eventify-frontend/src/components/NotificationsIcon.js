import { useState, useEffect } from "react";

function NotificationsIcon() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        // Fetch tickets to get payment and booking notifications
        const ticketsResponse = await fetch('https://group-5-new.onrender.com/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!ticketsResponse.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const tickets = await ticketsResponse.json();

        // Transform tickets into notifications
        const ticketNotifications = tickets.map(ticket => ({
          id: ticket.id,
          type: 'ticket',
          message: `Ticket for Event ID: ${ticket.event_id} - Status: ${ticket.status}`,
          status: ticket.status,
          timestamp: new Date(ticket.purchase_date).toLocaleString()
        }));

        // Fetch events to get more context for ticket notifications
        const eventsResponse = await fetch('https://group-5-new.onrender.com/events');
        const events = await eventsResponse.json();

        // Enrich notifications with event details
        const enrichedNotifications = ticketNotifications.map(notification => {
          const event = events.find(e => e.id === parseInt(notification.message.split('Event ID: ')[1]));
          return {
            ...notification,
            eventTitle: event ? event.title : 'Unknown Event'
          };
        });

        // Add some system notifications
        const systemNotifications = [
          { 
            id: 'system1', 
            type: 'system', 
            message: "Welcome to Event Ticketing Platform!", 
            timestamp: new Date().toLocaleString() 
          }
        ];

        // Combine and sort notifications
        const allNotifications = [
          ...enrichedNotifications, 
          ...systemNotifications
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setNotifications(allNotifications);

      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Refresh notifications periodically
    const intervalId = setInterval(fetchNotifications, 60000); // Every minute

    return () => clearInterval(intervalId);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const getNotificationStyle = (notification) => {
    if (notification.type === 'ticket') {
      switch (notification.status) {
        case 'paid':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'pending':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        default:
          return 'bg-gray-50 border-gray-200 text-gray-800';
      }
    }
    return 'bg-blue-50 border-blue-200 text-blue-800';
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown} 
        className="text-gray-200 hover:text-cyan-400 transition-colors relative"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 inline-block w-4 h-4 bg-red-600 text-white rounded-full text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20">
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`px-4 py-3 border-b border-gray-200 ${getNotificationStyle(notification)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">
                          {notification.type === 'ticket' 
                            ? `Ticket for ${notification.eventTitle}` 
                            : notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleNotificationClick(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsIcon;