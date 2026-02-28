import jwt from "jsonwebtoken";
import User  from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

// reigister
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, adminSecret } = req.body;

  if (!name || !email || !password || !adminSecret) {
    throw new ApiError(400, "name, email, password, adminSecret are required");
  }

  if (adminSecret !== process.env.ADMIN_REGISTER_SECRET) {
    throw new ApiError(403, "Invalid admin secret");
  }

  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email already registered");

  // Optional: allow only ONE admin in DB
  const anyAdmin = await User.findOne({ role: "admin" });
  if (anyAdmin) throw new ApiError(403, "Admin already exists");

  const user = await User.create({ name, email, password, role: "admin" });
  const token = signToken(user._id);

  res.status(201).json({
    success: true,
    message: "Admin registered",
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }
  });
});

//  login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "email and password are required");

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const ok = await user.comparePassword(password);
  if (!ok) throw new ApiError(401, "Invalid credentials");

  const token = signToken(user._id);

  res.json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});