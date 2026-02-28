import { Social } from "../models/social.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addSocial = asyncHandler(async (req, res) => {
  const social = await Social.create(req.body);

  res.status(201).json({
    success: true,
    message: "Social link added",
    data: social
  });
});

export const getSocials = asyncHandler(async (req, res) => {
  const socials = await Social.find();

  res.json({
    success: true,
    data: socials
  });
});

export const deleteSocial = asyncHandler(async (req, res) => {
  await Social.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Social deleted"
  });
});