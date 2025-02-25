import React, { useState } from "react";

function CartSidebar({ cartItems, onRemove, onCheckout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you would integrate with your payment API
    console.log("Processing payment:", {
      method: paymentMethod,
      phoneNumber,
      totalAmount,
      items: cartItems.map((item) => item.title),
    });
    // Once payment is processed, call onCheckout (or clear the cart)
    onCheckout();
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors relative"
      >
        {isOpen ? "Close Cart" : "Open Cart"}
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cart</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">KES {item.price.toLocaleString()}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <h3 className="text-xl font-bold">
                  Total: KES {totalAmount.toLocaleString()}
                </h3>
              </div>
              <div className="mt-6 border-t pt-6">
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
                  {paymentMethod === "mpesa" && (
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
            </>
          )}
        </div>
      )}
    </>
  );
}

export default CartSidebar;
