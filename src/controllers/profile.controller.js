import { Profile } from "../models/profile.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const data = req.body;

  let profile = await Profile.findOne();

  if (profile) {
    profile = await Profile.findByIdAndUpdate(profile._id, data, { new: true });
  } else {
    profile = await Profile.create(data);
  }

  res.json({
    success: true,
    message: "Profile saved successfully",
    data: profile
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) throw new ApiError(404, "Profile not found");

  res.json({ success: true, data: profile });
});