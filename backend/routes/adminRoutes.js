import { Router } from "express";
const router = Router();
import { getPendingJobs, getPendingEvents, approveOrDeny } from "../controllers/adminController";
import { approveJob, denyJob } from "../controllers/adminController";
import adminMiddleware from "../middleware/adminMiddleware";

 
// Get pending jobs
router.get("/pending-jobs", getPendingJobs);

// Get pending events
router.get("/pending-events", getPendingEvents);

// Approve or Deny job/event
router.put("/approve", approveOrDeny);


router.post("/approve/:jobId", adminMiddleware, approveJob);
router.post("/deny/:jobId", adminMiddleware, denyJob);

export default router;
