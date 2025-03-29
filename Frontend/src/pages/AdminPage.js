import React, { useState, useEffect } from 'react';
import { getPendingEvents, approveEvent } from '../utils/api';
import "../styles/global.css";
const AdminPage = () => {
  const [events, setEvents] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getPendingEvents(); // Fetch pending events
        console.log("Fetched Events:", response); // Log the fetched data

        // Ensure the response is an array
        if (Array.isArray(response)) {
          setEvents(response);
        } else if (response.data && Array.isArray(response.data)) {
          // If the response is an object with a `data` array
          setEvents(response.data);
        } else {
          throw new Error("Invalid data format: Expected an array of events");
        }
      } catch (err) {
        setError("Failed to fetch events: " + err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      await approveEvent(eventId); // Approve the event
      const updatedEvents = await getPendingEvents(); // Re-fetch pending events
      setEvents(updatedEvents); // Update state with the latest events
    } catch (error) {
      setError("Approval failed: " + error.message); // Set error state
    }
  };

  if (loading) {
    return <div>Loading events...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Unapproved Events</h2>
      {!Array.isArray(events) ? (
        <p>No events available or data is invalid.</p>
      ) : events.filter(event => !event.approved).length === 0 ? (
        <p>No unapproved events available.</p>
      ) : (
        events.filter(event => !event.approved).map((event) => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button onClick={() => handleApprove(event._id)}>Approve</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;