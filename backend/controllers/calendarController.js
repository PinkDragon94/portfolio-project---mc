import { find } from "../models/Calendar";

// Get all calendar events (both partner and alumni)
const getCalendarEvents = async (req, res) => {
  try {
    const events = await find().populate("eventId");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching calendar events" });
  }
};

export default { getCalendarEvents };
