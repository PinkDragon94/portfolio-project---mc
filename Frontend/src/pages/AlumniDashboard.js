import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import { fetchAlumniData } from "../utils/api";
import "../styles/global.css";

const AlumniDashboard = () => {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!user || user.role !== "alumni") {
        setLoading(false);
        return;
      }

      try {
        const [alumniData, jobsRes, eventsRes] = await Promise.all([
          fetchAlumniData(),
          axios.get("http://localhost:5000/api/alumni/jobs"),
          axios.get("http://localhost:5000/api/alumni/events")
        ]);
        
        setAlumni(alumniData);
        setJobs(jobsRes.data);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (!user || user.role !== "alumni") {
    return React.createElement("div", { className: "unauthorized" }, "Unauthorized access");
  }

  if (loading) {
    return React.createElement("div", { className: "loading" }, "Loading dashboard...");
  }

  if (error) {
    return React.createElement("div", { className: "error" }, error);
  }

  return React.createElement(
    "div",
    { className: "dashboard-container" },
    [
      alumni ? React.createElement(ProfileCard, { alumni: alumni, key: "profile" }) : null,
      
      React.createElement(
        "div",
        { className: "dashboard-links", key: "links" },
        [
          React.createElement(Link, { to: "/job-board", key: "jobs" }, "Job Board"),
          React.createElement(Link, { to: "/event-calendar", key: "events" }, "Event Calendar"),
          React.createElement(Link, { to: "/resume-tools", key: "resume" }, "Resume Tools"),
          React.createElement(Link, { to: "/messaging", key: "messages" }, "Messaging")
        ]
      ),
      
      React.createElement("h3", { key: "jobs-header" }, "Available Jobs"),
      jobs.length > 0 ? 
        jobs.map(job => 
          React.createElement(
            "div",
            { key: job._id, className: "job-listing" },
            [
              React.createElement("p", { key: "title" }, job.title),
              React.createElement(
                "button",
                { 
                  key: "apply",
                  onClick: () => alert("Applied to " + job.title),
                  className: "apply-btn"
                },
                "Apply"
              )
            ]
          )
        ) :
        React.createElement("p", { key: "no-jobs" }, "No jobs available"),
      
      React.createElement("h3", { key: "events-header" }, "Upcoming Events"),
      events.length > 0 ?
        events.map(event =>
          React.createElement(
            "div",
            { key: event._id, className: "event-listing" },
            [
              React.createElement("p", { key: "title" }, event.title),
              React.createElement("p", { key: "date" }, "Date: " + event.date)
            ]
          )
        ) :
        React.createElement("p", { key: "no-events" }, "No events available")
    ]
  );
};

export default AlumniDashboard;