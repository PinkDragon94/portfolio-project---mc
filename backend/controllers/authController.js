import User, { findOne } from "../models/User";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    const token = sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findOne({ email });

    if (!user || !(await compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
