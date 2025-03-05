import { useState, useEffect } from "react";

const API_URL = "https://group-5-new.onrender.com/events";
// const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA3MTUzOCwianRpIjoiNTZhZTIzMDctYzFmZC00NWEyLWI2YzgtYWMyZThiNzMxZDA5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IntcImlkXCI6IDE1LCBcImVtYWlsXCI6IFwibW1tQGV4YW1wbGUuY29tXCIsIFwicm9sZVwiOiBcImFkbWluXCJ9IiwibmJmIjoxNzQxMDcxNTM4LCJjc3JmIjoiN2NlMTY5YjUtZmM2My00NTllLTgxZmItZDg1OTc1Y2YzZDg0IiwiZXhwIjoxNzQxMDcyNDM4fQ.ZhhCz-3FGVFwKeomruqkngSC5RwHpkofdMm32I-SQu8";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    ticket_price: "",
    image: "",
    type: "Upcoming",
    category: "Music",
  });
  const [editingId, setEditingId] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error(`Error fetching events: ${res.statusText}`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.title || !form.date || !form.location || !form.ticket_price) {
      alert("Please fill in all required fields.");
      return;
    }
  
    
    

    const eventData = {
      title: form.title, // title instead of name
      description: form.description,
      date: form.date,
      location: form.location,
      ticket_price: parseFloat(form.ticket_price), // ensure ticket_price is a float
      image: form.image,
      category: form.category,
      available_tickets: 50, // Default available tickets
      featured: false, // Default featured status
    };
  
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
  
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(eventData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error from API:', errorData);
        throw new Error(`Error submitting event: ${res.statusText}`);
      }
  
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        ticket_price: "",
        image: "",
        type: "Upcoming",
        category: "Music",
      });
      fetchEvents();
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };
  

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.split("T")[0] : "",
      location: event.location,
      ticket_price: Number(event.ticket_price),
      image: event.image,
      type: event.type,
      category: event.category,
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Manage Events
          </h1>

          {/* Event Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Name"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Event Location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <div className="space-y-4">
                <input
                  type="number"
                  name="ticket_price"
                  placeholder="Ticket Price (KSH)"
                  value={form.ticket_price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Event Description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-24"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Featured">Featured</option>
              </select>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
              >
                <option value="Music">Music</option>
                <option value="Tech">Tech</option>
                <option value="Sport">Sport</option>
                <option value="Food">Food</option>
                <option value="Art">Art</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {editingId ? "Update Event" : "Create Event"}
            </button>
          </form>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Type:</span> {event.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Category:</span> {event.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Location:</span> {event.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Price:</span> KSH{" "}
                      {event.ticket_price}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {expandedEvent === event.id
                      ? event.description
                      : `${event.description.slice(0, 100)}...`}
                    <button
                      onClick={() => handleExpand(event.id)}
                      className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                    >
                      {expandedEvent === event.id ? "Show Less" : "Read More"}
                    </button>
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEvents;
