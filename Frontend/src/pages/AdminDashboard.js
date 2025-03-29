const { useContext, useEffect, useState } = require("react");
const AuthContext = require("../context/AuthContext");
const axios = require("axios");
      

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const { getPendingJobs, approveOrDeny } = require("../utils/api");

  getPendingJobs().then((jobs) => console.log(jobs));
  
  approveOrDeny("jobId123", "job", "approved")
    .then((res) => console.log("Job Approved", res));
    
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    axios.get("http://localhost:5000/api/admin/pending-jobs")
      .then((res) => setPendingJobs(res.data));

    axios.get("http://localhost:5000/api/admin/pending-events")
      .then((res) => setPendingEvents(res.data));
  }, [user]);

  const handleApproval = async (id, type, status) => {
    await axios.put("http://localhost:5000/api/admin/approve", { id, type, status });

    if (type === "job") {
      setPendingJobs(pendingJobs.filter((job) => job._id !== id));
    } else if (type === "event") {
      setPendingEvents(pendingEvents.filter((event) => event._id !== id));
    }
  };

  if (!user || user.role !== "admin") return "Unauthorized";

  return (
    require("react").createElement("div", null,
      require("react").createElement("h2", null, "Admin Dashboard"),
      
      require("react").createElement("h3", null, "Pending Jobs"),
      pendingJobs.map((job) =>
        require("react").createElement("div", { key: job._id },
          job.title + " - " + job.createdBy,
          require("react").createElement("button", {
            onClick: () => handleApproval(job._id, "job", "approved")
          }, "Approve"),
          require("react").createElement("button", {
            onClick: () => handleApproval(job._id, "job", "denied")
          }, "Deny")
        )
      ),

      require("react").createElement("h3", null, "Pending Events"),
      pendingEvents.map((event) =>
        require("react").createElement("div", { key: event._id },
          event.title + " - " + event.createdBy,
          require("react").createElement("button", {
            onClick: () => handleApproval(event._id, "event", "approved")
          }, "Approve"),
          require("react").createElement("button", {
            onClick: () => handleApproval(event._id, "event", "denied")
          }, "Deny")
        )
      )
    )
  );
}

module.exports = AdminDashboard;
