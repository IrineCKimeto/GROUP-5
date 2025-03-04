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
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Manage Events</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Event Name"
            value={form.title}
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
            name="ticket_price"
            placeholder="Ticket Price"
            value={form.ticket_price || ""}
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

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Featured">Featured</option>
          </select>

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
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800">{event.title}</h3>
              <p className="text-sm text-gray-500">Type: {event.type}</p>
              <p className="text-sm text-gray-500">Category: {event.category}</p>
              <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <p className="text-sm text-gray-500">Ticket Price: KSH{event.ticket_price}</p>
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
