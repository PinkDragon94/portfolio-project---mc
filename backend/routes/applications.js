const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply for a job (user only)
router.post('/', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.body.job);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existingApplication = await Application.findOne({
      job: req.body.job,
      user: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      job: req.body.job,
      user: req.user.id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get applications for a job (vendor/admin only)
router.get('/job/:jobId', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if user is job owner or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('user', 'name email');
      
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's applications (user only)
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('job', 'title company location');
      
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update application status (vendor/admin only)
router.patch('/:id/status', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job', 'postedBy');
      
    if (!application) return res.status(404).json({ message: 'Application not found' });

    // Check if user is job owner or admin
    if (application.job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this application' });
    }

    application.status = req.body.status;
    await application.save();
    
    res.json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;