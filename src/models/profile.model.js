import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    title: { type: String },
    bio: { type: String },
    yearsExperience: { type: Number, default: 0 },
    projectsCount: { type: Number, default: 0 },
    technologiesCount: { type: Number, default: 0 },
    leetcodeCount: { type: Number, default: 0 },
    avatar: { type: String }
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);