const { submitJob } = require("../utils/api");

const JobForm = () => {
  return `
    <form id="job-form">
      <h2>Post a Job</h2>
      <input type="text" id="job-title" placeholder="Job Title" required />
      <textarea id="job-description" placeholder="Job Description" required></textarea>
      <input type="text" id="job-company" placeholder="Company Name" required />
      <button type="submit">Submit Job</button>
    </form>
    <script>
      document.getElementById("job-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const jobData = {
          title: document.getElementById("job-title").value,
          description: document.getElementById("job-description").value,
          company: document.getElementById("job-company").value
        };

        try {
          const response = await submitJob(jobData);
          alert(response.message); // Show success message
        } catch (error) {
          console.error('Error submitting job:', error);
          alert('Failed to submit job. Please try again.'); // Show error message
        }
      });
    </script>
  `;
};

module.exports = JobForm;
