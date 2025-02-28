import React from "react";

const AboutUs = () => {
  const features = [
    {
      icon: "🎪",
      title: "Easy Event Creation",
      description: "Create and manage events with our intuitive interface"
    },
    {
      icon: "🎫",
      title: "Secure Ticketing",
      description: "Fast and secure ticket purchasing system"
    },
    {
      icon: "📱",
      title: "User Friendly",
      description: "Seamless experience across all devices"
    },
    {
      icon: "🌈",
      title: "Event Variety",
      description: "Wide range of event categories to choose from"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
            alt="Event atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white space-y-6 max-w-2xl">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to Eventify
            </h1>
            <p className="text-xl text-gray-200">
              Your premier platform for discovering and managing events across Kenya
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            To empower event organizers and attendees by providing a simple, efficient, 
            and engaging platform for discovering and managing events.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20 bg-gray-50">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
