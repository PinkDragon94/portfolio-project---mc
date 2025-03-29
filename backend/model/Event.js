import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    approved: { type: Boolean, default: false }, // To track approval status
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);

export default Event; // Correct ES module export

