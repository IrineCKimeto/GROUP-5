import React, { useEffect, useState } from "react";

const AdminTicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("https://67b9b65e51192bd378de33da.mockapi.io/api/v1/tickets")
      .then((res) => res.json())
      .then((data) => {
        const pendingTickets = data.filter((ticket) => ticket.status === "pending");
        setTickets(pendingTickets);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    fetch(`https://67b9b65e51192bd378de33da.mockapi.io/api/v1/tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
      })
      .catch((error) => console.error("Error updating ticket:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pending Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No pending tickets</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{ticket.userName}</td>
                  <td className="p-3">{ticket.eventName}</td>
                  <td className="p-3">${ticket.price}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(ticket.id, "approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(ticket.id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTicketList;
