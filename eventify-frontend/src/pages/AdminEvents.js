import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://group-5-new.onrender.com/events";

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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate("/signin");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error(`Error fetching events: ${res.statusText}`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch events. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate("/signin");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit event");

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
      setMessage("Event submitted successfully!");
      fetchEvents();
    } catch (error) {
      setMessage("Error submitting event. Please try again.");
    }
  };

  const handleEdit = (event) => {
    setForm({ ...event });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate("/signin");
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      setMessage("Event deleted successfully.");
      fetchEvents();
    } catch (error) {
      setMessage("Error deleting event. Please try again.");
    }
  };

  const handleExpand = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Manage Events</h1>

      {message && <p className="text-center text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="ticketPrice"
            value={form.ticketPrice}
            onChange={handleChange}
            placeholder="Ticket Price"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Past">Past</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {editingId ? "Update Event" : "Add Event"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Event List</h2>

        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">{event.name}</h3>
                  {expandedEvent === event.id ? (
                    <p>{event.description}</p>
                  ) : null}
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-4 py-2 text-white bg-indigo-600 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleExpand(event.id)}
                    className="px-4 py-2 text-white bg-green-600 rounded-md"
                  >
                    {expandedEvent === event.id ? "Collapse" : "Expand"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminEvents;
