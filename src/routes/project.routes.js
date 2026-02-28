import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getProjects, updateProjectFlags } from "../controllers/project.controller.js";
import { syncGithubProjects } from "../controllers/github.controller.js";

const router = Router();

router.get("/", getProjects); // Public
router.post("/sync", protect, syncGithubProjects); // Admin only
router.patch("/:id", protect, updateProjectFlags); // Admin update flags

export default router;