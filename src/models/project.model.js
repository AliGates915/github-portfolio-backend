import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    githubId: { type: Number, unique: true },
    name: String,
    description: String,
    htmlUrl: String,
    homepage: String,
    language: String,
    stars: Number,
    forks: Number,
    topics: [String],
    isFeatured: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);