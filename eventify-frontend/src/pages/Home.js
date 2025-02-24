import React from 'react';

function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                            <p className="text-sm text-cyan-600 font-semibold">Next Week</p>
                            <h3 className="text-lg font-semibold text-gray-800 mt-1">Tech Conference 2024</h3>
                            <p className="text-gray-600 text-sm mt-2">Join us for the biggest tech event of the year</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                            <p className="text-sm text-purple-600 font-semibold">This Weekend</p>
                            <h3 className="text-lg font-semibold text-gray-800 mt-1">Music Festival</h3>
                            <p className="text-gray-600 text-sm mt-2">Experience live performances under the stars</p>
                        </div>
                    </div>
                </div>

                {/* Featured Events */}
                <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <img 
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" 
                            alt="Featured Event"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h3 className="text-white font-semibold">Annual Art Exhibition</h3>
                            <p className="text-gray-200 text-sm">Discover amazing artworks</p>
                        </div>
                    </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-800">Popular Categories</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 text-center">
                            <span className="text-cyan-600 font-medium">Music</span>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 text-center">
                            <span className="text-purple-600 font-medium">Tech</span>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-3 text-center">
                            <span className="text-green-600 font-medium">Sports</span>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 text-center">
                            <span className="text-yellow-600 font-medium">Arts</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;