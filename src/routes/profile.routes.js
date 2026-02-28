import { Router } from "express";
import { createOrUpdateProfile, getProfile } from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getProfile); // Public
router.post("/", protect, createOrUpdateProfile); // Admin

export default router;