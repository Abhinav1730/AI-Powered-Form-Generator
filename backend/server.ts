import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import formRoutes from "./routes/form.routes.js";
import submissionRoutes from "./routes/submission.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// JSON-only routes
app.use("/api/auth", express.json({ limit: "10mb" }), authRoutes);
app.use("/api/form", express.json({ limit: "10mb" }), formRoutes);

// Multer will handle multipart for submission routes
app.use("/api/submission", submissionRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
