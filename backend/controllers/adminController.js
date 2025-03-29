import { findByIdAndUpdate } from "../models/Event";
import Calendar from "../models/Calendar";
import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

const approveOrDeny = async (req, res) => {
  const { id, type, status } = req.body;
  try {
    let updatedItem;
    let calendarEntry;

    // Handle job or event approval
    if (type === "job") {
      updatedItem = await Job.findByIdAndUpdate(id, { status }, { new: true });
    } else if (type === "event") {
      updatedItem = await findByIdAndUpdate(id, { status }, { new: true });

      if (status === "approved") {
        // Create a calendar entry for approved events
        calendarEntry = new Calendar({
          title: updatedItem.title,
          description: updatedItem.description,
          date: updatedItem.date,
          location: updatedItem.location,
          eventType: updatedItem.createdBy.isPartner ? "partner" : "alumni",
          eventId: updatedItem._id,
          createdBy: updatedItem.createdBy._id,
        });

        await calendarEntry.save();  // Save calendar entry
      }
    }

    res.json(updatedItem || calendarEntry);
  } catch (error) {
    res.status(500).json({ error: "Error updating approval status" });
  }
};
export default router;