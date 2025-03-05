import React, { useEffect, useState } from 'react';


const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch('https://group-5-new.onrender.com/api/tickets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      setTickets(data);
    };

    fetchTickets();
  }, []);

  return (
    <div className="tickets-page">
      <h1>Your Tickets</h1>
      <p>Here you can view the tickets you have purchased:</p>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            Ticket ID: {ticket.id}, Status: {ticket.status}, Purchase Date: {ticket.purchase_date}
          </li>
        ))}
      </ul>

      {/* Additional ticket details can be displayed here */}
    </div>
  );
};

export default Tickets;
