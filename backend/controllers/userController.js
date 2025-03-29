import { findById, findByIdAndUpdate } from "../models/User";

export async function getUserProfile(req, res) {
  try {
    const user = await findById(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving profile" });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const user = await findByIdAndUpdate(req.user.userId, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
}
