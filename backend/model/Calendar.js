const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  eventType: { type: String, enum: ["partner", "alumni"] },  // Tag event as either 'partner' or 'alumni'
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // Reference to Event
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the creator (partner or alumni)
});

module.exports = mongoose.model("Calendar", calendarSchema);
