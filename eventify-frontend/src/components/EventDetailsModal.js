import React from 'react';

function EventDetailsModal({ event, onClose }) {
  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">{event.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Date & Time</h3>
              <p>{event.date}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Location</h3>
              <p>{event.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Category</h3>
              <p>{event.category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Price</h3>
              <p>KES {event.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;
