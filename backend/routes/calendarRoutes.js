import { Router } from "express";
import { getCalendarEvents } from "../controllers/calendarController";

const router = Router();
// Get calendar events
router.get("/", getCalendarEvents);

export default router;
