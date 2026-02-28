import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

// About routes
import profileRouter from './routes/profile.routes.js'
import skillRoutes from './routes/skill.routes.js';
import socialRoutes from './routes/social.routes.js';

// Project routes
import projectRoutes from './routes/project.routes.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("✅ Portfolio API Running"));

app.use("/api/auth", authRoutes);
app.use('/api/profile', profileRouter);
app.use('/api/skills', skillRoutes);
app.use('/api/socials', socialRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFound);
app.use(errorHandler);