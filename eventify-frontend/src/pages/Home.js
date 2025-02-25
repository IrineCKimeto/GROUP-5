import React from 'react';

function Home() {
  // Data for the sections
  const stats = [
    {
      label: "Successful Events",
      value: 1000,
      suffix: "+",
    },
    {
      label: "Professional Organizers",
      value: 500,
      suffix: "+",
    },
    {
      label: "Satisfied Attendees",
      value: 50000,
      suffix: "+",
    },
  ];

  const upcomingEvents = [
    {
      date: "Next Week",
      title: "Tech Conference 2024",
      description: "Join us for the biggest tech event of the year",
    },
    {
      date: "This Weekend",
      title: "Music Festival",
      description: "Experience live performances under the stars",
    },
  ];

  const featuredEvent = {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Annual Art Exhibition",
    description: "Discover amazing artworks",
  };

  const popularCategories = [
    {
      name: "Music",
      color: "cyan",
    },
    {
      name: "Tech",
      color: "purple",
    },
    {
      name: "Sports",
      color: "green",
    },
    {
      name: "Arts",
      color: "yellow",
    },
  ];

  const testimonials = [
    {
      quote:
        "Eventify transformed our company retreat into an unforgettable experience. Their attention to detail and seamless execution were impressive!",
      author: "Sarah Smith",
      // role: "Director of Events, TechCorp Global",
    },
    {
      quote:
        "The most user-friendly platform I've used. Their support team is incredible, and the marketing tools are game-changing.",
      author: "Julius Kosalah",
      // role: "Event Manager, SoundWave Events",
    },
    {
      quote:
        "We've seen a 60% reduction in management time and a 25% increase in ticket sales since switching to Eventify.",
      author: "Emmanuel Philip",
      // role: "CEO, Conference Solutions",
    },
  ];

  // Pricing plans updated to Kenyan values
  const pricingPlans = [
    {
      name: "Free Events",
      // price: "KES0",
      features: [
        "No processing fee",
        "Standard ticketing options",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Paid Events",
      price: "3.7% + Kshs 10000",
      features: [
        "All free event features",
        "Advanced analytics",
        "Marketing tools",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Contact for Pricing",
      features: [
        "All free event features",
        "Custom branding",
        "Add-Ons",
        "Dedicated support team",
      ],
    },
  ];

  const addons = [
    "Featured Listing",
    "Staffing",
    "Social Media Promotion",
    "Branded Event Page",
    "Email Campaign",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-serif font-extrabold mb-4">
            Elevate Your Event Experience
          </h1>
          <p className="text-xl font-light mb-8">
            Where every moment matters. Experience events like never before.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold text-indigo-600">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </p>
              <p className="mt-2 text-lg text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-2xl font-serif font-bold">Upcoming Events</h2>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg">
                  <p className="text-sm text-indigo-700 font-semibold">{event.date}</p>
                  <h3 className="text-lg font-bold mt-1">{event.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer" onClick={() => window.location.href = '/events'}>
                <div className="flex items-center space-x-3 mb-4">
                  <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                  </svg>
                  <h2 className="text-2xl font-serif font-bold">Featured Event</h2>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <img
                  src={featuredEvent.image}
                  alt="Featured Event"
                  className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-xl">{featuredEvent.title}</h3>
                  <p className="text-gray-200 text-sm">{featuredEvent.description}</p>
                  </div>
                </div>
                </div>

                {/* Popular Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h2 className="text-2xl font-serif font-bold">Popular Categories</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {popularCategories.map((category, idx) => {
                const bgClasses = {
                  cyan: "from-cyan-100 to-cyan-200",
                  purple: "from-purple-100 to-purple-200",
                  green: "from-green-100 to-green-200",
                  yellow: "from-yellow-100 to-yellow-200",
                };
                const textClasses = {
                  cyan: "text-cyan-700",
                  purple: "text-purple-700",
                  green: "text-green-700",
                  yellow: "text-yellow-700",
                };
                return (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r ${bgClasses[category.color]} rounded-lg p-4 text-center`}
                  >
                    <span className={`font-medium ${textClasses[category.color]}`}>
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800 mb-4">
            Trusted by Event Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of event organizers who've grown their business with us.
          </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-b from-indigo-50 to-white p-8 rounded-xl shadow">
              <div className="space-y-6">
            <div className="w-8 h-8 text-yellow-400">⭐</div>
            <p className="text-lg text-gray-700 italic">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <h4 className="font-bold text-gray-900">
              {testimonial.author}
                </h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
              </div>
            </div>
          ))}
            </div>
          </div>
        </section>

        
          <section id="pricing" className="py-20 bg-gradient-to-b from-white to-indigo-50">
            <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800 mb-4">
          Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your event needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 transition-transform transform hover:scale-105 shadow-lg ${
          plan.highlighted
            ? "bg-gradient-to-b from-indigo-600 to-purple-600 text-white"
            : "bg-white text-gray-900"
            }`}
          >
            <div className="space-y-6">
          <h3 className="text-xl font-semibold font-serif">{plan.name}</h3>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{plan.price}</div>
            <div className={plan.highlighted ? "text-indigo-100" : "text-gray-600"}>
              per ticket
            </div>
          </div>
          <ul className="space-y-4">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center space-x-3">
            <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              plan.highlighted
            ? "bg-white text-indigo-600 hover:bg-indigo-50"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            onClick={() => window.location.href = '/events'}
          >
            Get Started
          </button>
            </div>
          </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <div className="bg-white p-10 rounded-lg max-w-4xl mx-auto shadow">
          <h3 className="text-2xl md:text-3xl font-bold font-serif text-indigo-600 mb-4">
            Enhance Your Event with Add-Ons
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Select from our exclusive add-ons to maximize your event’s impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {addons.map((addon, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-200"
          >
            {addon}
          </span>
            ))}
          </div>
          <p className="text-gray-600 text-md mb-4">
            Interested in customizing your event with add-ons? Get in touch with us.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors" onClick={() => window.location.href = '/support'}>
            Contact Us
          </button>
            </div>
          </div>
            </div>
          </section>

          {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our platform.
        </p>
          </div>
          <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            What is Eventify?
          </h3>
          <p className="text-gray-700">
            Eventify is a comprehensive event management platform that helps you organize, promote, and manage events efficiently.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            How do I create an event?
          </h3>
          <p className="text-gray-700">
            Creating an event is simple. Sign up for an account, navigate to the 'Create Event' section, and fill in the required details.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            What payment methods are supported?
          </h3>
          <p className="text-gray-700">
            We support online payment methods including mobile money using M-Pesa.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            Can I customize my event page?
          </h3>
          <p className="text-gray-700">
            Yes, you can customize your event page with your branding, images, and other details to make it unique.
          </p>
        </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
