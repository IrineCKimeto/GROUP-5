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
      <section className="py-24 bg-gray-50">
        <div className="max-w-8xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-8">
                <svg
                  className="w-8 h-8 text-indigo-500"
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
                <h2 className="text-3xl font-serif font-bold">Upcoming Events</h2>
              </div>
              <div className="space-y-6">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-colors duration-300">
                    <p className="text-lg text-indigo-700 font-semibold mb-2">{event.date}</p>
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 text-lg">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Event */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <svg
                    className="w-8 h-8 text-indigo-500"
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
                  <h2 className="text-3xl font-serif font-bold">Featured Event</h2>
                </div>
              </div>
              <div className="relative h-96 w-full">
                <img
                  src={featuredEvent.image}
                  alt="Featured Event"
                  className="w-full h-full object-cover rounded-b-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-b-2xl flex flex-col justify-end p-8">
                  <h3 className="text-white font-bold text-3xl mb-2">{featuredEvent.title}</h3>
                  <p className="text-gray-200 text-xl">{featuredEvent.description}</p>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-8">
                <svg
                  className="w-8 h-8 text-indigo-500"
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
                <h2 className="text-3xl font-serif font-bold">Popular Categories</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
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
                      className={`bg-gradient-to-r ${bgClasses[category.color]} rounded-xl p-8 text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <span className={`text-xl font-bold ${textClasses[category.color]}`}>
                        {category.name}
                      </span>
                    </div>
                  );
                })}
              </div>
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
              <div 
                key={idx} 
                className="relative group bg-white p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2"
              >
                {/* Decorative gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
                  <div className="h-full w-full bg-white rounded-2xl" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-2 text-5xl text-indigo-200 opacity-50">"</div>
                  
                  {/* Star Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    {testimonial.quote}
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.author}
                      </h4>
                      {testimonial.role && (
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      )}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-indigo-50 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
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
            <div className="bg-white p-10 rounded-2xl max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                Enhance Your Event with Add-Ons
              </h3>
              <p className="text-lg text-gray-600 mb-12">
                Select from our exclusive add-ons to maximize your event's impact and create unforgettable experiences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {addons.map((addon, idx) => (
                  <div 
                    key={idx}
                    className="group relative p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                    <div className="flex flex-col items-center space-y-4">
                      {/* Icons for each add-on */}
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {idx === 0 && (
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {idx === 1 && (
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                        {idx === 2 && (
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        )}
                        {idx === 3 && (
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                        )}
                        {idx === 4 && (
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {addon}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 text-lg">
                  Interested in customizing your event with add-ons? Get in touch with us.
                </p>
                <button 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => window.location.href = '/support'}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our platform.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    What is Eventify?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Eventify is a comprehensive event management platform that helps you organize, promote, and manage events efficiently.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    How do I create an event?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Creating an event is simple. Sign up for an account, navigate to the 'Create Event' section, and fill in the required details.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    What payment methods are supported?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We support online payment methods including mobile money using M-Pesa.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    Can I customize my event page?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, you can customize your event page with your branding, images, and other details to make it unique.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Help Button */}
          <div className="text-center mt-12">
            <button 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              onClick={() => window.location.href = '/support'}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Need More Help?
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
