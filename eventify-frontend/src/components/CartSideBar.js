import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartSidebar({ cartItems, onRemove, onCheckout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + (item.ticket_price || 0) * item.quantity,
      0
    );
    setAmount(totalAmount);
  }, [cartItems]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Verify token validity
      fetch("https://group-5-new.onrender.com/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    console.log("Processing payment:", {
      paymentMethod,
      phoneNumber,
      amount,
    });

    try {
      const response = await fetch(
        "https://group-5-new.onrender.com/mpesa/stk-push",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Payment error details:", errorData);
        if (errorData.message === "Failed to get M-Pesa access token") {
          // Retry logic or additional handling for access token failure
          throw new Error(
            "Failed to process payment: M-Pesa access token issue. Please try again later."
          );
        } else {
          throw new Error(
            `Failed to process payment: ${
              errorData.message || response.statusText
            }`
          );
        }
      }

      const result = await response.json(); // Keep this line
      console.log("Payment successful:", result);
      onCheckout();
      navigate("/tickets"); // Redirect to Tickets page

    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(`Payment failed. ${error.message}`);
    }
  };

  return (
    <>
      {/* Floating Cart Button Positioned in the Middle-Right of the Page */}
      <button
        onClick={toggleSidebar}
        className='fixed right-8 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7H17m-10 0a1 1 0 102 0 1 1 0 00-2 0m8 0a1 1 0 102 0 1 1 0 00-2 0'
          />
        </svg>
        {cartItems.length > 0 && (
          <span className='absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center'>
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Sliding Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='p-6 flex flex-col h-full'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>Your Cart</h2>
            <button
              onClick={toggleSidebar}
              className='text-gray-500 hover:text-gray-700'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p className='text-gray-600 flex-grow'>Your cart is empty.</p>
          ) : (
            <div className='flex flex-col flex-grow'>
              <ul className='space-y-4'>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className='flex justify-between items-center border-b pb-2'
                  >
                    <div>
                      <h3 className='text-lg font-semibold'>{item.title}</h3>
                      <p className='text-gray-600'>
                        KES {item.ticket_price?.toLocaleString()}
                      </p>
                      <p className='text-gray-600'>Qty: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className='text-red-500 hover:text-red-700'
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className='mt-6'>
                <h3 className='text-xl font-bold'>
                  Total: KES {amount.toLocaleString()}
                </h3>
              </div>
              <div className='mt-6 border-t pt-6'>
                <h3 className='text-xl font-semibold mb-4'>Payment Details</h3>
                <form onSubmit={handlePayment} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value='mpesa'>M-Pesa</option>
                      <option value='card'>Credit/Debit Card</option>
                    </select>
                  </div>
                  {paymentMethod === "mpesa" && (
                    <>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          M-Pesa Phone Number
                        </label>
                        <input
                          type='tel'
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder='254700000000'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Amount
                        </label>
                        <input
                          type='number'
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </div>
                    </>
                  )}
                  <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
                  >
                    Pay Now
                  </button>
                </form>
                {errorMessage && (
                  <div className='text-red-500 text-sm mt-2'>
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
