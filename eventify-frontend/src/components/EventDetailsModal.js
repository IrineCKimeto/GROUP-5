import React, { useState } from 'react';

function EventDetailsModal({ event, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handlePayment = (e) => {
    e.preventDefault();
    // Here you would integrate with your payment API
    console.log('Processing payment:', {
      method: paymentMethod,
      phoneNumber,
      event: event.title,
      amount: event.price
    });
  };

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

        <div className="space-y-4 mb-8">
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

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="mpesa">M-Pesa</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>

            {paymentMethod === 'mpesa' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254700000000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal; 