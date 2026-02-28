import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ success: true, 
    count: projects.length,
    data: projects });
});

export const updateProjectFlags = asyncHandler(async (req, res) => {
  const { isFeatured, isPinned } = req.body;

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { isFeatured, isPinned },
    { new: true }
  );

  res.json({ success: true, data: project });
});