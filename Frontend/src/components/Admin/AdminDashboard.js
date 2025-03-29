import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchData = async () => {
      try {
        const [jobsResponse, eventsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/admin/pending-jobs`),
          axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/admin/pending-events`)
        ]);

        setPendingJobs(jobsResponse.data);
        setPendingEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching pending items:", error);
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchData();
  }, [user]);

  const handleApproval = async (id, type, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/admin/approve`, { id, type, status });
      
      // Optimistic UI update for immediate feedback
      updatePendingItems(id, type);
    } catch (error) {
      console.error("Error approving item:", error);
      // Optionally handle error, show user a message, etc.
    }
  };

  // Function to remove approved/denied item from the state
  const updatePendingItems = (id, type) => {
    if (type === "job") {
      setPendingJobs(pendingJobs.filter((job) => job._id !== id));
    } else {
      setPendingEvents(pendingEvents.filter((event) => event._id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;  // Show loading state

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="pending-section">
        <h3>Pending Jobs</h3>
        {pendingJobs.length > 0 ? (
          pendingJobs.map((job) => (
            <div key={job._id} className="pending-item">
              <p>{job.title} - {job.createdBy}</p>
              <div className="action-buttons">
                <button 
                  onClick={() => handleApproval(job._id, "job", "approved")}
                  className="btn-approve"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleApproval(job._id, "job", "denied")}
                  className="btn-deny"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending jobs</p>
        )}
      </section>

      <section className="pending-section">
        <h3>Pending Events</h3>
        {pendingEvents.length > 0 ? (
          pendingEvents.map((event) => (
            <div key={event._id} className="pending-item">
              <p>{event.title} - {event.createdBy}</p>
              <div className="action-buttons">
                <button 
                  onClick={() => handleApproval(event._id, "event", "approved")}
                  className="btn-approve"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleApproval(event._id, "event", "denied")}
                  className="btn-deny"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending events</p>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
