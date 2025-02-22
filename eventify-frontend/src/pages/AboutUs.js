import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
        <img 
          src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"
          alt="Event image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            About Eventify
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* About Section */}
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Eventify is a modern event management and ticketing platform designed
            to make event planning seamless. Whether you're an organizer looking to
            manage events or an attendee searching for exciting experiences, we've
            got you covered!
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-700 text-center">
            To empower event organizers and attendees by providing a simple,
            efficient, and engaging platform for discovering and managing events.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Why Choose Eventify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-500 text-xl">🔹</span>
              <span className="text-gray-700">Easy event creation & management</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-500 text-xl">🔹</span>
              <span className="text-gray-700">Secure & fast ticket purchasing</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-500 text-xl">🔹</span>
              <span className="text-gray-700">User-friendly interface</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-500 text-xl">🔹</span>
              <span className="text-gray-700">Wide range of event categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
