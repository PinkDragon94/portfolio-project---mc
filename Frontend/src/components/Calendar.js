import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/global.css";

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  // Fetch events from the backend (API)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")  // Replace with your API endpoint
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Convert event date to string to easily compare with the selected date
  const getEventDates = () => {
    return events.map((event) => format(new Date(event.date), "yyyy-MM-dd"));
  };

  // Handle date change on calendar
  const handleDateChange = (date) => {
    setDate(date);
  };

  // Handle event click to show details
  const handleEventClick = (event) => {
    alert(`${event.title} on ${format(new Date(event.date), "yyyy-MM-dd")}`);
  };

  return (
    <div>
      <h1>Event Calendar</h1>
      <ReactCalendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          const eventDates = getEventDates();
          return eventDates.includes(format(date, "yyyy-MM-dd")) ? "highlight" : null;
        }}
      />
      <div>
        <h2>Events for {format(date, "yyyy-MM-dd")}</h2>
        {events
          .filter((event) => format(new Date(event.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
          .map((event) => (
            <div key={event._id} onClick={() => handleEventClick(event)}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location || "TBA"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventCalendar;
