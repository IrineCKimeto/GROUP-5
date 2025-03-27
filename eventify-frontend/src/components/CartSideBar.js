import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartSidebar({ cartItems, onRemove, onCheckout, setPaymentNotification }) {
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
    const token = localStorage.getItem("accessToken");
    if (token) {
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

    if (!selectedEvent) {
      setErrorMessage("Please select an event before paying.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      
      // First, book the ticket
      const ticketResponse = await fetch('https://group-5-new.onrender.com/tickets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ event_id: selectedEvent })
      });

      if (!ticketResponse.ok) {
        throw new Error('Failed to book ticket');
      }

      const ticketData = await ticketResponse.json();
      const ticketId = ticketData.id;

      // Then proceed with M-Pesa payment
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
            ticket_id: ticketId  // Include ticket ID for tracking
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment failed");
      }

      const result = await response.json();
      
      // Set successful payment notification
      setPaymentNotification({
        type: 'success', 
        message: 'Payment initiated successfully. Check your phone for M-Pesa prompt.'
      });

      // Navigate to tickets page
      navigate("/tickets");

    } catch (error) {
      console.error("Payment error:", error);
      
      // Set error payment notification
      setPaymentNotification({
        type: 'error', 
        message: `Payment failed: ${error.message}`
      });
    }
  };

  // Rest of the component remains the same, but add state for event selection
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://group-5-new.onrender.com/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* Previous button code remains the same */}
      
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='p-6 flex flex-col h-full'>
          {/* Previous code remains the same */}
          
          <div className='mt-6 border-t pt-6'>
            <h3 className='text-xl font-semibold mb-4'>Event Selection</h3>
            <select 
              value={selectedEvent} 
              onChange={(e) => setSelectedEvent(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="">Select an event</option>
              {eventsData.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title} - KES {event.ticket_price}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-6 border-t pt-6'>
            <h3 className='text-xl font-semibold mb-4'>Payment Details</h3>
            <form onSubmit={handlePayment} className='space-y-4'>
              {/* Previous payment form code remains the same */}
            </form>
            {errorMessage && (
              <div className='text-red-500 text-sm mt-2'>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;