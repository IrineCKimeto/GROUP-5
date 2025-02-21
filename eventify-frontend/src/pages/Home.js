import React from 'react';

function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Section */}
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search Event" 
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                    <div className="bg-gray-100 rounded-lg h-48">
                        {/* Placeholder for upcoming events */}
                    </div>
                </div>

                {/* Featured Events */}
                <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Events</h2>
                    <div className="bg-gray-100 rounded-lg h-48">
                        {/* Placeholder for featured events */}
                    </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Categories</h2>
                    <div className="bg-gray-100 rounded-lg h-48">
                        {/* Placeholder for categories */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;