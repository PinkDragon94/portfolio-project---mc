import Event from "../model/Event.js";

// Submit an event posting
export const submitEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      status: "pending", // Default status for admin approval
    });
    const savedEvent = await newEvent.save();
    res.json({ message: "Event submitted successfully", event: savedEvent });
  } catch (error) {
    res.status(500).json({ error: "Error submitting event" });
  }
};

// Approve an event
export const approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.approved = true;
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
