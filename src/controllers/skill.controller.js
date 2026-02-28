import { Skill } from "../models/skill.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);

  res.status(201).json({
    success: true,
    message: "Skill added",
    data: skill
  });
});

export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();

  res.json({
    success: true,
    count: skills.length,
    data: skills
  });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Skill deleted"
  });
});