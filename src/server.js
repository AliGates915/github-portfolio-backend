import "dotenv/config";
import {  app } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8000;

await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});