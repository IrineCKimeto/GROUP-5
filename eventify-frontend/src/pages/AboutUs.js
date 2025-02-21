import React from "react";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-banner">
        <img 
          src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"
          alt="Event image"
        />
      </div>

      <h1>About Eventify</h1>
      <p>
        Eventify is a modern event management and ticketing platform designed
        to make event planning seamless. Whether you're an organizer looking to
        manage events or an attendee searching for exciting experiences, we've
        got you covered!
      </p>

      <h2>Our Mission</h2>
      <p>
        To empower event organizers and attendees by providing a simple,
        efficient, and engaging platform for discovering and managing events.
      </p>

      <h2>Why Choose Eventify?</h2>
      <ul>
        <li>🔹 Easy event creation & management</li>
        <li>🔹 Secure & fast ticket purchasing</li>
        <li>🔹 User-friendly interface</li>
        <li>🔹 Wide range of event categories</li>
      </ul>

      
    </div>
  );
};

export default AboutUs;
