import { Router } from "express";
import { getJobs, getEvents, applyForJob } from "../controllers/alumniController";

const router = Router();
// Get all jobs available to alumni
router.get("/jobs", getJobs);

// Get all events available to alumni
router.get("/events", getEvents);

// Apply for a job
router.post("/apply/:jobId", applyForJob);

export default router;
