import { Router } from "express";
import { submitEvent, approveEvent } from "../controllers/eventController.js"; // Corrected import
import authMiddleware, { checkAdmin } from "../middleware/authMiddleware.js";
import Event from "../model/Event.js"; // Corrected import

const router = Router();

// Route to approve an event
router.put("/:eventId/approve", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByIdAndUpdate(eventId, { approved: true }, { new: true });

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.send(event);
  } catch (error) {
    res.status(500).send("Failed to approve event");
  }
});

// Route to submit an event (Requires authentication)
router.post("/create", authMiddleware, submitEvent);

// Get all events (Visible to all users, admin sees unapproved too)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Approve an event (Admin only)
router.patch("/approve/:id", authMiddleware, checkAdmin, approveEvent);

export default router;