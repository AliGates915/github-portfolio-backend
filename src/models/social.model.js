import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true }
  },
  { timestamps: true }
);

export const Social = mongoose.model("Social", socialSchema);