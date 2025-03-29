import React, { useState, useEffect } from "react";
import { approveEvent } from "../utils/api"; // Importing the approveEvent function

const EventApproval = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the list of pending events from the API
    axios.get("/api/admin/pending-events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleApprove = async (eventId) => {
    try {
      const response = await approveEvent(eventId);
      alert(response.message); // Notify the user about the approval success
      // Optionally, refresh the event list or remove the approved event
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      alert("Failed to approve event: " + error.message);
    }
  };

  return (
    <div>
      <h1>Pending Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button onClick={() => handleApprove(event._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventApproval;
