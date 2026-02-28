import axios from "axios";
import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const syncGithubProjects = asyncHandler(async (req, res) => {

  const response = await axios.get(
    `${process.env.GITHUB_API_URL}/user/repos`,
    {
      params: {
        per_page: 100,
        affiliation: "owner,collaborator,organization_member",
        sort: "updated"
      },
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    }
  );

  console.log("GitHub status:", response.status);
  console.log("GitHub data type:", typeof response.data);
  console.log("GitHub count:", response.data.length);

  for (const repo of response.data) {
    await Project.findOneAndUpdate(
      { githubId: repo.id },
      {
        githubId: repo.id,
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics,
        private: repo.private
      },
      { upsert: true, new: true }
    );
  }

  res.json({
    success: true,
    count: response.data.length,
    message: "GitHub repositories synced successfully"
  });
});