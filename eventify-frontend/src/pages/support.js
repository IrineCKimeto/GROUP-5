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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white h-[400px] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80"
            alt="Support Cover"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 font-serif tracking-tight drop-shadow-lg">
            How Can We Help?
          </h1>
          <p className="text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            We're here to assist you with any questions or concerns about your events
          </p>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Email Contact */}
          <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Support</h3>
              <p className="text-gray-600 mb-6">Get in touch with our support team via email for detailed assistance</p>
              <button
                onClick={() => window.location.href = "mailto:support@eventify.com"}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Email Us
              </button>
            </div>
          </div>

          {/* Phone Contact */}
          <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone Support</h3>
              <p className="text-gray-600 mb-6">Speak directly with our support team for immediate assistance</p>
              <button
                onClick={() => window.location.href = "tel:+254712345678"}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Call Us
              </button>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">Chat with our support team in real-time for quick responses</p>
              <button
                onClick={toggleChat}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Ticket Form */}
      <div className="max-w-3xl mx-auto px-4 mb-20">
        <div className="bg-white rounded-xl shadow-xl p-10 border border-gray-100">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-8">
            Submit a Support Ticket
          </h2>
          <form onSubmit={handleSubmitTicket} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-700 font-semibold block text-lg">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={ticketDetails.name}
                onChange={(e) => setTicketDetails({ ...ticketDetails, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-semibold block text-lg">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={ticketDetails.email}
                onChange={(e) => setTicketDetails({ ...ticketDetails, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="issue" className="text-gray-700 font-semibold block text-lg">
                Describe Your Issue
              </label>
              <textarea
                id="issue"
                value={ticketDetails.issue}
                onChange={(e) => setTicketDetails({ ...ticketDetails, issue: e.target.value })}
                placeholder="Please provide details about your issue"
                rows="4"
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg mt-8"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>

      {/* Live Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-96 bg-white rounded-xl shadow-2xl border border-gray-100">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Live Support</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="h-96 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-xl ${
                  msg.sender === 'User' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;