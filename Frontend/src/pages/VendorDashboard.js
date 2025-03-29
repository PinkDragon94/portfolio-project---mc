import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import axios from "axios";
import "../styles/global.css";

function VendorDashboard() {
  // Use the useAuth hook instead of useContext directly
  const { user } = useAuth();
  const [jobTitle, setJobTitle] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  // Ensure the user is authorized before rendering
  if (!user || user.role !== "vendor") return "Unauthorized";

  const handleSubmit = async (type) => {
    const payload = type === "job" 
      ? { title: jobTitle, createdBy: user.email }
      : { title: eventTitle, createdBy: user.email };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/vendor/${type}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include auth token if needed
          },
        }
      );
      console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} Submitted`, response.data);
      if (type === "job") setJobTitle("");
      if (type === "event") setEventTitle("");
    } catch (error) {
      console.error("Error submitting", type, error);
    }
  };

  return (
    <div className="vendor-dashboard">
      <h2>Vendor Dashboard</h2>
      <p>Welcome, {user.name}!</p>

      <div className="form-section">
        <h3>Submit Job</h3>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job Title"
        />
        <button onClick={() => handleSubmit("job")}>Submit Job</button>
      </div>

      <div className="form-section">
        <h3>Submit Event</h3>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event Title"
        />
        <button onClick={() => handleSubmit("event")}>Submit Event</button>
      </div>
    </div>
  );
}

export default VendorDashboard;