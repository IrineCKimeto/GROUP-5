import React, { useState } from "react";


function Support() {
  const [ticketDetails, setTicketDetails] = useState({
    name: "",
    email: "",
    issue: "",
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Handle form submission
  const handleSubmitTicket = (e) => {
    e.preventDefault();

    // Basic validation
    if (!ticketDetails.name || !ticketDetails.email || !ticketDetails.issue) {
      alert("Please fill out all fields.");
      return;
    }

    // submitting a support ticket
    console.log("Support Ticket Submitted:", ticketDetails);
    alert("Your support ticket has been submitted successfully!");

    // Reset the form
    setTicketDetails({ name: "", email: "", issue: "" });
  };

  // Handle live chat toggle
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending message in live chat
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "User", message: newMessage }]);
      setNewMessage('');
      // Our fake bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages, 
          { sender: "Bot", message: "How can I assist you today?" }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Contact Methods Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Contact Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Contact */}
          <div className="contact-option text-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Email</h3>
            <p>If you have any questions, feel free to email us.</p>
            <button
              onClick={() => window.location.href = "mailto:support@eventify.com"}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Email Us
            </button>
          </div>

          {/* Phone Contact */}
          <div className="contact-option text-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Phone</h3>
            <p>For urgent queries, you can reach us by phone.</p>
            <button
              onClick={() => window.location.href = "tel:+254712345678"}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Call Us
            </button>
          </div>

          {/* Live Chat Contact */}
          <div className="contact-option text-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Live Chat</h3>
            <p>Click the button below to start a live chat with our support agent.</p>
            <button
              onClick={toggleChat}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* Support Ticket Form */}
      <div className="max-w-7xl mx-auto px-4 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Submit a Support Ticket</h2>
        <form onSubmit={handleSubmitTicket} className="space-y-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={ticketDetails.name}
              onChange={(e) => setTicketDetails({ ...ticketDetails, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={ticketDetails.email}
              onChange={(e) => setTicketDetails({ ...ticketDetails, email: e.target.value })}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Issue Input */}
          <div className="flex flex-col">
            <label htmlFor="issue" className="text-gray-700 font-semibold mb-2">
              Describe Your Issue
            </label>
            <textarea
              id="issue"
              value={ticketDetails.issue}
              onChange={(e) => setTicketDetails({ ...ticketDetails, issue: e.target.value })}
              placeholder="Describe the issue you are facing"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Live Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-10 w-80 h-96 bg-white shadow-xl rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Live Chat</h2>
            <button onClick={toggleChat} className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button 
              onClick={handleSendMessage} 
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;