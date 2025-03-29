import React from 'react';
import Calendar from '../components/Calendar'; // Import the Calendar component
import "../styles/global.css";
const CalendarPage = () => {
  return (
    <div>
      <h1>Calendar Page</h1>
      <Calendar /> {/* Display Calendar Component */}
    </div>
  );
};

export default CalendarPage;

