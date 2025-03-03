import React from "react";
import AdminTicketList from "../components/AdminTicketList";

const AdminTickets = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6">
        <AdminTicketList />
      </div>
    </div>
  );
};

export default AdminTickets;

