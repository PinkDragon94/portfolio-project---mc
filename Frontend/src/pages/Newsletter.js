import React, { useState } from "react";
import axios from "axios";
import "../styles/global.css"; 

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/newsletter/subscribe", { email });
      setStatus("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setStatus("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h1>Newsletter Subscription</h1>
      <p>Stay updated with the latest news, events, and job opportunities!</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default Newsletter;
