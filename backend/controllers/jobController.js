import Job, { findById } from "../models/Job";
export async function createJob(req, res) {
  try {
    const newJob = new Job({ ...req.body, vendor: req.user.userId });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: "Error creating job" });
  }
}
// Submit a job posting
const submitJob = async (req, res) => {
  const { title, description, company } = req.body;
  try {
    const newJob = new Job({
      title,
      description,
      company,
      status: "pending", // Default status for admin approval
    });
    const savedJob = await newJob.save();
    res.json({ message: "Job submitted successfully", job: savedJob });
  } catch (error) {
    res.status(500).json({ error: "Error submitting job" });
  }
};

export async function applyJob(req, res) {
  try {
    const job = await findById(req.params.jobId);
    job.applications.push({ userId: req.user.userId, status: "Pending" });
    await job.save();
    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error applying for job" });
  }
}

export default { submitJob };
