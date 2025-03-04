import { useState, useEffect } from "react";

const API_URL = "https://46c4-102-166-191-208.ngrok-free.app/events";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    ticketPrice: "",
    image: "",
    type: "Upcoming", // Default selection
    category: "Music", // Default selection
  });
  const [editingId, setEditingId] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(API_URL);
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
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setEditingId(null);
      setForm({
        name: "",
        description: "",
        date: "",
        location: "",
        ticketPrice: "",
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
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      ticketPrice: event.ticketPrice,
      image: event.image,
      type: event.type,
      category: event.category,
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleExpand = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Manage Events</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={form.ticketPrice}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>

          {/* Event Type Dropdown */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Featured">Featured</option>
          </select>

          {/* Category Dropdown */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Sport">Sport</option>
            <option value="Food">Food</option>
            <option value="Art">Art</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
          {editingId ? "Update Event" : "Create Event"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-gray-200">
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800">{event.name}</h3>
              <p className="text-sm text-gray-500">Type: {event.type}</p>
              <p className="text-sm text-gray-500">Category: {event.category}</p>
              <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <p className="text-sm text-gray-500">Ticket Price: ${event.ticketPrice}</p>
              <p className="text-sm text-gray-600">
                {expandedEvent === event.id ? event.description : `${event.description.slice(0, 100)}...`}
                <button onClick={() => handleExpand(event.id)} className="text-blue-600 hover:text-blue-800">
                  {expandedEvent === event.id ? "Show Less" : "View More"}
                </button>
              </p>
            </div>
            <div className="p-6 flex space-x-4">
              <button onClick={() => handleEdit(event)} className="px-4 py-2 bg-yellow-600 text-white rounded-lg">
                Edit
              </button>
              <button onClick={() => handleDelete(event.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEvents;
