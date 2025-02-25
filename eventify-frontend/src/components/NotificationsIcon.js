import { useState, useEffect } from "react";

function NotificationsIcon() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Hypothetical notifications
    const fetchNotifications = async () => {
      const data = [
        { id: 1, message: "New event created!" },
        { id: 2, message: "Your event has been approved." },
        { id: 3, message: "Reminder: Event starts in 1 hour." },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-gray-200 hover:text-cyan-400 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      {notifications.length > 0 && (
        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
      )}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-20">
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="px-4 py-2 text-gray-800 border-b border-gray-200">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationsIcon;
