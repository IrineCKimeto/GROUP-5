import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function CartSidebar({ cartItems, onRemove, onCheckout, isOpen, toggleSidebar }) {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkoutRequestID, setCheckoutRequestID] = useState(null);
  const [pollingStatus, setPollingStatus] = useState(false);

  // Backend API URL
  const API_URL = "https://group-5-new.onrender.com/";

  // Define checkPaymentStatus using useCallback to avoid recreating the function on every render
  const checkPaymentStatus = useCallback(async (requestId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/mpesa/query-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ CheckoutRequestID: requestId })
      });
      
      if (!response.ok) {
        throw new Error("Failed to check payment status");
      }
      
      const result = await response.json();
      
      // Check the response structure based on your backend implementation
      if (result.ResultCode === "0" || result.ResultCode === 0) {
        // Payment successful
        setPaymentStatus({
          success: true,
          message: "Payment completed successfully!"
        });
        setPollingStatus(false);
        setIsProcessing(false);
        // Save payment details to your backend
        savePaymentDetails(result);
        onCheckout(); // Clear cart
      } else if (result.errorCode === "500.001.1001") {
        // Still waiting for payment - continue polling
      } else {
        // Payment failed or canceled
        setPaymentStatus({
          success: false,
          message: result.ResultDesc || "Payment failed or was canceled"
        });
        setPollingStatus(false);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  }, [API_URL, onCheckout]);

  // Save payment details to your backend
  const savePaymentDetails = useCallback(async (paymentResult) => {
    try {
      const token = localStorage.getItem("access_token");
      const totalAmount = cartItems.reduce(
        (total, item) => total + (item.ticket_price || 0) * item.quantity,
        0
      );
      
      await fetch(`${API_URL}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            event_id: item.id,
            quantity: item.quantity
          })),
          transaction_id: paymentResult.MpesaReceiptNumber || paymentResult.CheckoutRequestID,
          amount: Math.round(totalAmount),
          phone_number: phoneNumber
        })
      });
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  }, [API_URL, cartItems, phoneNumber]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    if (token) {
      // Verify token validity
      fetch(`${API_URL}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Token verification failed");
      })
      .then(data => {
        if (data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("access_token");
      });
    }
  }, [API_URL]);

  // Effect for polling payment status when a checkout request is initiated
  useEffect(() => {
    let intervalId;
    
    if (checkoutRequestID && pollingStatus) {
      intervalId = setInterval(() => {
        checkPaymentStatus(checkoutRequestID);
      }, 5000); // Poll every 5 seconds
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [checkoutRequestID, pollingStatus, checkPaymentStatus]); // Added checkPaymentStatus to dependencies

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.ticket_price || 0) * item.quantity,
    0
  );

  // Validate phone number format
  const isValidPhoneNumber = (number) => {
    // Check if number starts with 254, 0, or 7 and is the right length
    const kenyanPattern = /^(254\d{9}|0\d{9}|7\d{8})$/;
    return kenyanPattern.test(number);
  };
  
  // Ensure phone number is in the correct format for M-Pesa
  const formatPhoneNumber = (number) => {
    // If number starts with 0, replace with 254
    if (number.startsWith('0')) {
      return '254' + number.substring(1);
    }
    // If number starts with 7, add 254 prefix
    else if (number.startsWith('7')) {
      return '254' + number;
    }
    // Number already in correct format (254...)
    return number;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Validate phone number before proceeding
    if (!isValidPhoneNumber(phoneNumber)) {
      setPaymentStatus({
        success: false,
        message: "Please enter a valid Kenyan phone number"
      });
      return;
    }
    
    if (!isLoggedIn) {
      // Store cart in session storage to retrieve after login
      sessionStorage.setItem('pendingCart', JSON.stringify(cartItems));
      navigate("/login");
      return;
    }
    
    setIsProcessing(true);
    setPaymentStatus({
      success: true,
      message: "Initiating payment request..."
    });
    
    try {
      const token = localStorage.getItem("access_token");
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      
      const response = await fetch(`${API_URL}/mpesa/stk-push`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          phone_number: formattedPhoneNumber,
          amount: Math.round(totalAmount), // M-Pesa requires whole numbers
          items: cartItems.map(item => ({ 
            event_id: item.id,
            quantity: item.quantity 
          }))
        }),
      });
  
      const result = await response.json();
      
      if (response.ok && result.ResponseCode === "0") {
        // STK push sent successfully
        setCheckoutRequestID(result.CheckoutRequestID);
        setPollingStatus(true);
        setPaymentStatus({
          success: true,
          message: "Please check your phone and enter your M-Pesa PIN to complete the payment"
        });
      } else {
        // STK push failed
        setPaymentStatus({
          success: false,
          message: result.errorMessage || "Failed to initiate payment"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus({
        success: false,
        message: "An error occurred while processing payment"
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      {/* Floating Cart Button Positioned in the Middle-Right of the Page */}
      <button
        onClick={toggleSidebar}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7H17m-10 0a1 1 0 102 0 1 1 0 00-2 0m8 0a1 1 0 102 0 1 1 0 00-2 0"
          />
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
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
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-gray-600 flex-grow">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col flex-grow">
              <ul className="space-y-4 overflow-y-auto max-h-64">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">
                        KES {item.ticket_price?.toLocaleString()}
                      </p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={isProcessing}
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
              
              {/* Payment status messages */}
              {paymentStatus && (
                <div className={`mt-4 p-3 rounded ${paymentStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {paymentStatus.message}
                </div>
              )}
              
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isProcessing}
                    >
                      <option value="mpesa">M-Pesa</option>
                      <option value="card" disabled>Credit/Debit Card (Coming Soon)</option>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isProcessing}
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: 254XXXXXXXXX or 07XXXXXXXX</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`w-full text-white py-2 px-4 rounded-md transition-colors ${
                      isProcessing 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;