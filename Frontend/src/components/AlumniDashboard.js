const { useContext, useEffect, useState } = require("react");
const AuthContext = require("../context/AuthContext");
const axios = require("axios");

function AlumniDashboard() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "alumni") return;
    
    axios.get("http://localhost:5000/api/alumni/jobs").then((res) => setJobs(res.data));
    axios.get("http://localhost:5000/api/alumni/events").then((res) => setEvents(res.data));
  }, [user]);

  return require("react").createElement("div", null,
    require("react").createElement("h2", null, "Alumni Dashboard"),

    require("react").createElement("h3", null, "Available Jobs"),
    jobs.length > 0 ? jobs.map((job) =>
      require("react").createElement("div", { key: job._id },
        job.title,
        require("react").createElement("button", { onClick: () => alert("Applied to " + job.title) }, "Apply")
      )
    ) : require("react").createElement("p", null, "No jobs available"),

    require("react").createElement("h3", null, "Upcoming Events"),
    events.length > 0 ? events.map((event) =>
      require("react").createElement("div", { key: event._id },
        event.title,
        require("react").createElement("p", null, "Date: " + event.date)
      )
    ) : require("react").createElement("p", null, "No events available")
  );
}

module.exports = AlumniDashboard;
