import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["frontend", "backend", "tools", "devops", "database", "other"],
      required: true
    },
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "intermediate"
    }
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);