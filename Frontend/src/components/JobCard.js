const { applyForJob } = require("../utils/api");

const JobCard = (job) => {
  return `
    <div class="job-card">
      <h3>${job.title}</h3>
      <p>${job.description}</p>
      <p><strong>Posted By:</strong> ${job.company}</p>
      <button onclick="applyJob('${job._id}')">Apply Now</button>
    </div>
  `;
};

// Apply for a job when clicking the button
window.applyJob = async (jobId) => {
  const result = await applyForJob(jobId);
  alert(result.message);
};

module.exports = JobCard;
