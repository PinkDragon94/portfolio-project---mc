import { find, findById } from "../models/Job";
import { find as _find } from "../models/Event";

// Get all available jobs for alumni
const getJobs = async (req, res) => {
  try {
    const jobs = await find({ status: "approved" });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

// Get all available events for alumni
const getEvents = async (req, res) => {
  try {
    const events = await _find({ status: "approved" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
};

// Apply for a job
const applyForJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    // Assume a "JobApplication" model to store applications
    // You can add the application logic here
    res.json({ message: "Job application submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error applying for job" });
  }
};

export default { getJobs, getEvents, applyForJob };
