import { Router } from "express";
import User, { findOne } from "../models/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const router = Router();

// Register User
router.post("/register", async (req, res) => {
  const hashedPassword = await hash(req.body.password, 10);
  const newUser = new User({ ...req.body, password: hashedPassword });
  await newUser.save();
  res.status(201).json(newUser);
});

// Login User
router.post("/login", async (req, res) => {
  const user = await findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
